<template>
  <div class="print">
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
      {{ topPopupTitle }}
    </mu-popup>
    <div class="print-wrap">
      <mu-dialog :open="dialog" title="警告">
        请将信息填写完整
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
      <div class="demo-step-container">
        <mu-stepper :activeStep="activeStep">
          <mu-step>
            <mu-step-button @click="changeStep(0)">
              打印任务申请
            </mu-step-button>
          </mu-step>
          <mu-step>
            <mu-step-button @click="changeStep(1)">
              信息核对
            </mu-step-button>
          </mu-step>
        </mu-stepper>
        <div class="demo-step-content">
          <mu-paper>
            <mu-card-title :title="cardTitle" subTitle="Content Title"/>
            <div class="step-wrap" v-show="activeStep === 0">
              <form>
                <multiple-file-uploader postURL="/tasks/file/uploading" successMessagePath="上传成功" errorMessagePath=""></multiple-file-uploader>
                <mu-raised-button type="file" class="demo-raised-button" label="点此上传打印文件" labelPosition="before" icon="folder" primary fullWidth/><br>
                <mu-text-field v-model="fillingRate" label="填充率" hintText="百分比" type="number" fullWidth/><br/>
                <mu-text-field v-model="storyHeight" label="层高" hintText="单位：毫米" type="number" fullWidth/><br/>
                <mu-select-field v-model="structure" :labelFocusClass="['label-foucs']" label="填充结构" fullWidth>
                  <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text" />
                </mu-select-field>
              </form>
            </div>
            <div class="step-wrap" v-show="activeStep === 1">
              <mu-list>
                <mu-list-item :inset="false" :title="'文件：' + uploadFileInfo.title">
                </mu-list-item>
                <mu-list-item :inset="false" :title="'填充率：' + task.fillingRate + '%'">
                </mu-list-item>
                <mu-list-item :inset="false" :title="'层高：' + task.storyHeight + 'mm'">
                </mu-list-item>
                <mu-list-item :inset="false" :title="'填充结构：' + task.structure">
                </mu-list-item>
              </mu-list>
            </div>
          </mu-paper>
          <div>
            <mu-flat-button class="demo-step-button" label="上一步" :disabled="activeStep === 0" @click="handlePrev"/>
            <mu-raised-button class="demo-step-button" label="下一步" v-show="activeStep === 0" primary @click="handleNext"/>
            <mu-raised-button class="demo-step-button" label="开始打印" v-show="activeStep === 1" primary @click="submit"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../router/index.js'
import MultipleFileUploader from '../components/MultipleFileUploader'

export default {
  data () {
    return {
      dialog: false,
      activeStep: 0,
      location: 0,
      topPopup: false,
      fillingRate: '',
      storyHeight: '',
      topPopupTitle: '',
      printList: [{
        image: '/images/breakfast.jpg',
        title: 'Breakfast',
        author: 'Myron'
      }],
      structure: 0,
      list: ['直线形', '对角线', '六角形', 'Catfill', 'Moroccan stars形']
      // cardTitle: '选择一个活动的地点'
    }
  },
  computed: {
    ...mapGetters({
      task: 'filledTask',
      user: 'user',
      uploadFileInfo: 'uploadFileInfo'
    }),
    inputTask () {
      return {
        fillingRate: this.fillingRate,
        storyHeight: this.storyHeight,
        structure: this.list[this.structure]
      }
    },
    cardTitle () {
      let message = ''
      switch (this.activeStep) {
        case 0:
          message = '填写任务申请'
          break
        case 1:
          message = '请确认您的打印信息'
          break
        default:
          message = 'fuck! 又 TM 出错了！！！'
          break
      }
      return message
    },
    finished () {
      return this.activeStep > 2
    }
  },
  methods: {
    ...mapActions(['fillingTask', 'applyForPrint']),
    handleNext () {
      if (!this.fillingRate || !this.storyHeight) {
        this.dialog = true
      } else {
        this.activeStep++
      }
    },
    handlePrev () {
      this.activeStep--
    },
    changeStep (index) {
      this.activeStep = index
    },
    submit () {
      if (this.user) {
        this.applyForPrint(this.user.username).then(() => {
          this.topPopupTitle = '提交成功！'
          this.topPopup = true
        })
      } else {
        router.push({
          name: 'Login'
        })
      }
    },
    close () {
      this.dialog = false
    }
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    },
    inputTask (val) {
      this.fillingTask(val)
    }
  },
  created () {
    this.fillingRate = this.task.fillingRate
    this.storyHeight = this.task.storyHeight
    for (var index in this.list) {
      console.log(this.list[index], this.list[index] === this.task.structure, index)
      if (this.list[index] === this.task.structure) {
        this.structure = index - 0
        break
      }
    }
    // this.structure = this.list.find(p => p === this.task.structure)
  },
  components: {
    MultipleFileUploader
  }
}
</script>

<style>
.demo-step-container {
  width: 100%;
  max-width: 700px;
  margin: auto;
}

.demo-step-content {
  margin: 0  16px;
}

.demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}

.demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
.mu-paper {
  padding: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
