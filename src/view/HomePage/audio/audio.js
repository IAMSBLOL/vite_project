
import { isEmpty } from 'lodash'
import WavEncoder from './utils'
export default class AudioConcatenator {
  constructor () {
    // this.config = props
    const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    this.context = new AudioContext();
    this.destination = this.context.destination;

    this.startTime = performance.now()
    this.channel = new MessageChannel();
    this.source = null
    this.timer = undefined
    this.buffers = [];
    this.output = null;
    this.timeOffet = 0
  }

  frameYieldMs = 5

  schedulePerformWorkUntilDeadline = null

  isReady = false

  shouldYieldToHost () {
    const timeElapsed = performance.now() - this.startTime;
    if (timeElapsed < this.frameYieldMs) {
      return false;
    }
    return true;
  }

  simulateTask () {
    this.channel.port1.onmessage = () => {
      this.performWorkUntilDeadline()
    }

    this.schedulePerformWorkUntilDeadline = function () {
      this.startTime = performance.now()
      this.channel.port2.postMessage(null);
    };
  }

  async performWorkUntilDeadline () {
    if (this.shouldYieldToHost()) {
      await this.transformOutput()
      this.isReady = true
      this.autoPlayOrReturnUrl()
    } else {
      this.schedulePerformWorkUntilDeadline()
    }
  }

  async load (url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await this.context.decodeAudioData(arrayBuffer);
    this.buffers.push(buffer);
  }

  init () {
    this.startTime = performance.now()
    this.isReady = false
    this.source = null
    this.timer = undefined
    this.buffers = [];
    this.output = null
  }

  loadResources (urls, cb) {
    if (isEmpty(urls)) {
      throw new Error('no audio resource urls')
    }
    this.urls = urls
    this.cb = cb
    this.init()
    this.simulateTask()
    this.schedulePerformWorkUntilDeadline()
  }

  async transformOutput () {
    const urls = this.urls

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      await this.load(url)
    }
    const length = this.buffers.reduce((total, buffer) => total + buffer.length, 0);
    this.output = this.context.createBuffer(2, length, this.context.sampleRate);
    let offset = 0;
    for (const buffer of this.buffers) {
      const numberOfChannels = buffer.numberOfChannels
      for (let i = 0; i < numberOfChannels; i++) {
        this.output.getChannelData(i).set(buffer.getChannelData(i), offset);
      }
      offset += buffer.length;
    }

    this.timeOffet = this.output.duration * 1000
  }

  autoPlayOrReturnUrl () {
    if (this?.cb) {
      const blob = WavEncoder(this.output)
      const url = window.URL.createObjectURL(blob);
      this?.cb(url)
    } else {
      // window.navigator.mediaDevices.getUserMedia({
      //   audio: true
      // }).then(mediaStream => {
      //   this.context.resume()
      // }).catch(err => {
      //   console.error(err);
      // });
      window.document.body.addEventListener('click', this.resume, { once: true })
      this.play()
    }
  }

  resume = () => {
    this.context.resume()
  }

  play () {
    if (this.isReady) {
      const cb = () => {
        try {
          this.source = this.context.createBufferSource();
          this.source.buffer = this.output;
          this.source.connect(this.destination);
          this.source.start(0);
        } catch (e) {

        }
      }
      cb()
      // this.timer = setInterval(cb, this.config.wait + this.output.duration * 1000)
    }
  }

  destory () {
    window.document.body.removeEventListener('click', this.resume);
    // this.config = null
    this.context = null;
    this.destination = null;
    this.startTime = null
    this.channel = null
    this.source = null
    this.timer = undefined
    this.buffers = [];
    this.output = null;
    this.timeOffet = null
  }
}
