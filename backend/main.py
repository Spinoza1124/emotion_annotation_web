from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import datetime
import os
from pathlib import Path

app = FastAPI(
    title="情感标注API",
    description="用于语音情感标注的Web API",
    version="0.1.0"
)

# 配置文件存储路径
AUDIO_STORAGE_PATH = Path("audio_files")
AUDIO_STORAGE_PATH.mkdir(exist_ok=True)

# 模拟语音数据存储（后面会用真正的数据库替换）
fake_audio_segments = [
    {
        "id": 1,
        "filename": "segment_001.wav",
        "original_name": "会议录音_片段1.wav",
        "duration": 5.2,  # 秒
        "emotion": "neutral",
        "confidence": 0.8,
        "annotator": "user1",
        "created_at": "2024-01-01T10:00:00",
        "file_size": 256000,  # 字节
        "sample_rate": 16000,  # Hz
        "channels": 1
    },
    {
        "id": 2,
        "filename": "segment_002.wav",
        "original_name": "客服通话_片段2.wav",
        "duration": 3.8,
        "emotion": "positive",
        "confidence": 0.9,
        "annotator": "user2",
        "created_at": "2024-01-01T11:00:00",
        "file_size": 187200,
        "sample_rate": 16000,
        "channels": 1
    },
    {
        "id": 3,
        "filename": "segment_003.wav",
        "original_name": "投诉电话_片段3.wav",
        "duration": 7.1,
        "emotion": "negative",
        "confidence": 0.95,
        "annotator": "user1",
        "created_at": "2024-01-01T12:00:00",
        "file_size": 350400,
        "sample_rate": 16000,
        "channels": 1
    }
]


@app.get("/")
def read_root():
    """欢迎页面 -返回API基本信息"""
    return {"message": "欢迎使用情感标注系统",
            "version": "0.1.0",
            "docs": "/docs",
            "supported_formats": ["wav", "mp3", "m4a"],
            "max_file_size": "50MB"    
    }

# 健康检查端点
@app.get("/health")
def health_check():
    """健康检查 - 确认服务运行状态"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "storage_path": str(AUDIO_STORAGE_PATH),
        "total_segments": len(fake_audio_segments)
    }

# 获取所有语音段列表
@app.get("/audio-segments")
def get_audio_segments(skip: int = 0, limit: int = 10):
    """获取所有语音段列表
    
    Args:
    skip: 跳过的记录数（用于分页）
    limit: 返回的最大记录数
    
    Returns:
        语音段列表和分页信息
    """
    total = len(fake_audio_segments)
    segments = fake_audio_segments[skip: skip + limit]

    return {
        "segments": segments,
        "total": total,
        "skip": skip,
        "limit": limit,
        "has_more": skip + limit < total
    }

# 根据ID获取特定语音段信息
@app.get("/audio-segments/{segment_id}")
def get_audio_segment(segment_id: int):
    """根据ID获取特定语音段信息

    Args:
        segment_id: 语音段ID

    """
    for segment in fake_audio_segments:
        if segment["id"] == segment_id:
            return segment
    raise HTTPException(status_code=404, detail="Audio segment with id {semgent_id} not found")

# 获取语音文件 (用于播放)
@app.get("/audio-segments/{segment_id}/file")
def get_audio_file(segment_id: int):
    """获取语音文件

    Args:
        segment_id: 语音段ID
    
    Returns:
        语音文件

    """
    # 查找语音段信息
    segment = None
    for s in fake_audio_segments:
        if s["id"] == segment_id:
            segment = s
            break

    if not segment:
        raise HTTPException(status_code=404, detail="Audio segment with id {segment_id} not found")
    
    # 构建文件路径
    file_path = AUDIO_STORAGE_PATH / segment["filename"]

    # 检查文件是否存在 (目前是模拟, 实际开发中需要真实数据)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Audio file {segment['filename']} not found. This is a demo API")

    return FileResponse(file_path, media_type="audio/wav", filename=segment["original_name"])

# 获取情感类别列表
@app.get("/emotions")
def get_emotions():
    """获取情感类别列表"""
    return {
        "emotions": [
            {
                "value": "positive",
                "label": "积极/正面",
                "color": "#52c41a",
                "descrpition": "表达快乐、满意、兴奋等正面情绪"
            },
            {
                "value": "negative", 
                "label": "消极/负面", 
                "color": "#ff4d4f",
                "description": "表达愤怒、悲伤、不满等负面情绪"
            },
            {
                "value": "neutral", 
                "label": "中性/平静", 
                "color": "#d9d9d9",
                "description": "情绪平稳，无明显情感倾向"
            },
            {
                "value": "surprised", 
                "label": "惊讶", 
                "color": "#faad14",
                "description": "表达意外、震惊等情绪"
            },
            {
                "value": "confused", 
                "label": "困惑", 
                "color": "#722ed1",
                "description": "表达疑惑、不理解等情绪"
            }
        ]
    }

# 获取标注统计信息
@app.get("/statistics")
def get_statistics():
    """获取标注统计信息"""
    # 统计各种情感的数量
    emotion_counts = {}
    total_duration = 0

    for segment in fake_audio_segments:
        emotion = segment["emotion"]
        emotion_counts["emotion"] = emotion_counts.get(emotion, 0) + 1
        total_duration += segment["duration"]
    
    return {
        "total_segments": len(fake_audio_segments),
        "total_duration": round(total_duration, 2),
        "average_duration": round(total_duration / len(fake_audio_segments), 2),
        "emotion_distribution": emotion_counts,
        "completion_rate": 100.0 # 假设所有都已标注
    }
