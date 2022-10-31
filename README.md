# dataset-viewer

项目只提供画线条、多边形、像素混合功能（待开发）。
基本涵盖常见算法输出的数据。
文档未完善，[在线推理相关业务的朋友可以先看这里](https://github.com/IAMSBLOL/dataset-viewer/tree/master/src/view/DatasetViewerExample/transfromUtils)

[在线demo](http://119.91.150.219:8080/)

## Installation

`yarn add datasetviewer`

## Documentation

### Usage

```
  import DatasetViewer from 'datasetviewer'

  const config:DatasetViewerConfig = {...}

  const viewer = new DatasetViewer(config)

  viewer.init()
```
### DatasetViewerConfig


| name | type | descriptions |
| --- | --- | --- |
| canvasInstance | HTMLCanvasElement | canvas标签，ref |
| url | string | 展示图片地址 |
| data | Array<DataItem> | canvas绘画的每一项数据 |
| opreationsConfig | DatasetViewerConfig | 能否缩放拖动的控制 |
| isDraw | boolean | 控制是否绘画数据 |

#### DataItem

| name | type | descriptions |
| --- | --- | --- |
| type | CustomRect \| polyline \| CustomPolygon \| [更多请查看fabric](http://fabricjs.com/docs/) | 必填项，这是画布应该用什么工具处理数据的前提 |
| label | string | 标签名 |
| points |  Array<{x:number, y:number}> | 多边形或者折线的坐标点 |
| stroke | string | 颜色 |
| fill | string | 颜色 |
| rectData | [x,y,w,h] | 起点坐标，宽高 |
| drawPoint | boolean | 是否需要画点 |



