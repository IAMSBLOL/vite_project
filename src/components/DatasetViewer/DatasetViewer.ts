
import { fabric } from 'fabric'
import { isEmpty } from 'lodash'
import { drawData, disableAnyFuck, setDropAndScale } from './utils'
/**
 * 奇怪的需求，公司要求写个原生的插件给外包老哥用。干脆搞开源算了。
 */
type DataItem = {
  type: string,
  points?: Array<any>,
  color?: string,
  fill?: string,
  rectData?: Array<any>,
}

interface DatasetViewerConfig {

  canvasInstance: HTMLCanvasElement;
  url: string;

  data: Array<DataItem>,
  isDraw?: boolean;
  opreationsConfig?: {
    zoom: boolean
  },
  parrentNode: HTMLElement | null;
}

// const defaultConfig = {
//   isDraw: true,
//   opreationsConfig: {
//     zoom: true
//   }
// }

let fbIns: fabric.Canvas | fabric.StaticCanvas | null = null

const datasetViewer = (config: DatasetViewerConfig) => {
  const { canvasInstance, parrentNode, url, opreationsConfig, data } = config;

  if (!canvasInstance) {
    throw (new Error('canvasInstance 不存在'))
  }

  if (!parrentNode) {
    throw (new Error('parrentNode 不存在'))
  }

  try {
    const image = new Image()
    // image.setAttribute('crossOrigin', 'anonymous');
    image.src = url

    image.onload = function () {
      const imgIns: HTMLImageElement = (this as any)
      if (opreationsConfig?.zoom && fbIns === null) {
        fbIns = new fabric.Canvas(canvasInstance)
      } else {
        fbIns = new fabric.StaticCanvas(canvasInstance)
      }

      const width = imgIns.naturalWidth;

      const height = imgIns.naturalHeight;

      fbIns.setBackgroundImage(
        url,
        fbIns.renderAll.bind(fbIns),
        {
          width,
          height,
          // originX: 'center',
          // originY: 'top'
        }
      );

      // 设置画布宽高
      fbIns.setWidth((parrentNode).offsetWidth).setHeight((parrentNode).offsetHeight)
      // 设置矩阵适应画布大小,如果图片超级大
      const matrix = fbIns.viewportTransform
      if (matrix) {
        // 先直接 看看直接设定宽度为容器宽度
        matrix[0] = (parrentNode).offsetWidth / (imgIns).naturalWidth;
        matrix[3] = (parrentNode).offsetWidth / (imgIns).naturalWidth;
        // if ((canvasContainer.current).offsetWidth < (this).naturalWidth) {
        //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        // }

        const tran = matrix[0]
        // 如果此时图高度比容器大，就继续转一手高度为最大，宽度忽略
        if ((imgIns).naturalHeight * tran > (parrentNode).offsetHeight) {
          matrix[0] = (parrentNode).offsetHeight / ((imgIns).naturalHeight * tran) * tran;
          matrix[3] = (parrentNode).offsetHeight / ((imgIns).naturalHeight * tran) * tran;
        }

        // if ((canvasContainer.current).offsetWidth > (this).naturalWidth) {
        //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        // }

        // 缩放后剧中显示，估计大佬也要求这玩意
        const _tran = matrix[3]
        const _width = (imgIns).naturalWidth * _tran;
        const _height = (imgIns).naturalHeight * _tran;
        const tranX = ((parrentNode).offsetWidth - _width) / 2
        const tranY = ((parrentNode).offsetHeight - _height) / 2
        matrix[4] = tranX
        matrix[5] = tranY
        fbIns.viewportTransform = matrix

        // 然而实际上后端返回的啥我也暂时不清楚，有毒
        if (data && !isEmpty(data)) {
          for (const o of data) {
            drawData(fbIns, o)
          }
        }
        fbIns.renderAll();
        if (opreationsConfig?.zoom) {
          // const myCtx = new Fb(fbctx)
          disableAnyFuck(fbIns as any)
          setDropAndScale(fbIns as any)
        }
      }
    }

    return fbIns
  } catch (e) {
    console.log(e)
  }
}

export default datasetViewer
