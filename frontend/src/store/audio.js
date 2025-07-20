import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { ElMessage } from "element-plus"

/**
 * 音频状态管理Store
 * 管理音频列表、播放状态、标注数据等
 */

export const useAudioStore = defineStore('audio', () => {
    // ==================== 响应式状态 ====================
    const audioList = ref([])
    const isAnnotated = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const volume = ref(1)
    const loading = ref(false)
    const isPlaying = ref(false)

    // ==================== 计算属性 ====================
    /**
     * 播放进度百分比
     */
    const progress = computed(() => {
        return duration.value > 0 ? (currentTime / duration) * 100 : 0
    })

    /**
     * 格式化当前播放时间
     */
    const formattedCurrentTime = computed(() => {
        return formatTime(currentTime.value)
    })

    /**
     * 格式化总时长
     */
    const formattedDuration = computed(() => {
        return formattedDuration(duration.value)
    })

    /**
     * 已标注音频数量
     */
    const annotatedCount = computed(() => {
        return audioList.filter(audio => audio.isAnnotated).length
    })
    
    /**
     * 未标注音频数量
     */
    const unannotatedCount = computed(() => {
        return audioList.filter(audio => !audio.isAnnotated).length
    })

    // ==================== 方法定义 ====================
    /**
     * 获取音频列表数量
     * @returns {Promise<void}
     */
    const fetchAudioList = async () => {
        try {
            loading.value = true
            const response = await fetch('/api/audio/list')

            if (!response.ok) {
                throw new Error(`HTTP ${res}: ${response.statusText}`)
            }

            const data = await response.json()
            audioList.value = data.map(audio => ({
                id: audio.id,
                name: audio.name,
                url: audio.url,
                duration: audio.duration || 0,
                size: audio.size || 0,
                isAnnotated: audio.is_annotated || false,
                emotionLabel: audio.emotion_label || '',
                confidence: audio.confidence || 0,
                notes: audio.notes || '',
                createdAt: audio.created_at
            }))

            ElMessage.success('音频列表加载成功')
        } catch (error) {
            console.error('获取音频列表失败:', error)
            ElMessage.error('获取音频列表失败: ' + error.message)
            throw error
        } finally {
            loading.value = false
        }
    }
    /**
     * 设置当前选中的音频
     * @param {Object} audio - 音频对象
     */

    const setSelectedAudio = (audio) => {
        selectedAudio.value = audio
        // 重置播放状态
        isPlaying.value = false
        currentTime.value = 0
        duration.value = audio?.duration || 0
    }

    /**
     * 设置播放状态
     * @param {boolean} playing - 是否正在播放
     */
    const setPlayingState = (playing) => {
        isPlaying.value = playing
    }

    /**
     * 更新当前播放时间
     * @param {number} time - 当前时间（秒）
     */
    const updateCurrentTime = (time) => {
        currentTime.value = time
    }
})