// import randomColor from 'randomcolor'

const example_json = {
  url: 'http://s3.ceph.k8s.gddi.com/storage-ic5rlt/2022/05/24/547c731b46c55ce5c0b31f1d2651f0697cb51461.jpg',
  model_type: 'cityscapes_segment',
  result: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAKoCAAAAADM6dLmAAAFB0lEQVR4nO3dW0pDQRBAQSPZ/5bjh+KPogm5ufM4VQvQcQiHhnb07Q0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBRl9EHYFO/fbJup5+Cf7yPPgAwjgBAmABAmABAmABAmABA2HX0ARjilyXdITs6a+XFmAAgTAAgTAAgTAAgTAAgTAAgzBqQL08837P8W5YJAMIEAMIEAMIEAMIEAMIEAMKsAfmD/d7uTAAQJgAQJgAQJgAQJgAQJgAQttsa8OG9lX9X93KueGImAAgTAAgTAAgTAAgTAAgTAAhbZg34qndp935duyx2ZAKAMAGAMAGAMAGAMAGAMAGAsCn/6uOUh3qRE9aLo6/TBnViJgAIEwAIEwAIEwAIEwAIEwAIG70iGn+Aqd25QVvlEi0Ep2MCgDABgDABgDABgDABgDABgDABgLBRG+RVNtccye8BTMcEAGECAGECAGECAGECAGECAGECAGECAGECAGECAGECAGECAGECAGHnvsrzBrDIG8CJmQAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAg7Dr6AGzKG8AlmAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgTAAgzGtAnufl37JMABAmABAmABAmABAmABAmABB2iX1fDmT7tz4TAIQJAIQJAIQJAIQJAIQJAIQNX8cNPwAPsvzbiQkAwgQAwgQAwgQAwgQAwgQAwqbcwk15KL5YA+7EBABhAgBhAgBhAgBhAgBhAgBhS2/clj78Yiz/9mQCgDABgDABgDABgDABgDABgLDWJq310x7KGnBPJgAIEwAIEwAIEwAIEwAIEwAIEwAIsxn/5ip+sv3fnQkAwgQAwgQAwgQAwgQAwgQAwuy+7rTIRdnb8RATAIQJAIQJAIQJAIQJAIQJAIQtst2a3Am3aL/HK5gAIEwAIEwAIEwAIEwAIEwAIMwa8FiH3KeVH2cxAUCYAECYAECYAECYAECYAECYNeAY3/du5cdIJgAIEwAIEwAIEwAIEwAIEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZ3GX0AONATn+fbcadYyPvoAwDjCACECQCECQCECQCECQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHz6ACIkGnA0TO4FAAAAAElFTkSuQmCC'

}

// const mixin = () => {
//   console.log('')
// }

export const segment = async () => {
  console.log('segment')
  const { url, result } = example_json

  // const color_map:{
  //   [index:string]:number
  // } = {

  // }

  const raw_img = new Image();

  raw_img.crossOrigin = 'anonymous';

  const result_img = new Image();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  raw_img.src = url;

  // 原始数据的像素矩阵
  const raw_matrix: Uint8ClampedArray | undefined = await new Promise(function (resolve, reject) {
    try {
      raw_img.onload = function () {
        canvas.width = raw_img.naturalWidth
        canvas.height = raw_img.naturalHeight
        const imgIns: HTMLImageElement = (this as any);
        ctx?.clearRect(0, 0, raw_img.naturalWidth, raw_img.naturalHeight)
        ctx?.drawImage(raw_img, 0, 0, imgIns.naturalWidth, imgIns.naturalHeight);
        const imageData = ctx?.getImageData(0, 0, imgIns.naturalWidth, imgIns.naturalHeight);
        console.log(imageData)
        resolve(imageData?.data)
      }
    } catch (e) {
      reject(e)
    }
  })

  result_img.src = result;
  // 结果数据的像素矩阵 Uint8ClampedArray
  const res_matrix: Uint8ClampedArray | undefined = await new Promise(function (resolve, reject) {
    try {
      result_img.onload = function () {
        const imgIns: HTMLImageElement = (this as any);
        ctx?.clearRect(0, 0, result_img.naturalWidth, result_img.naturalHeight)
        ctx?.drawImage(result_img, 0, 0, imgIns.naturalWidth, imgIns.naturalHeight);

        const imageData = ctx?.getImageData(0, 0, imgIns.naturalWidth, imgIns.naturalHeight);

        // const data = imageData?.data;
        resolve(imageData?.data)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })

  // 如果存在就开始对比
  if (raw_matrix && res_matrix) {
    for (let i = 0; i < res_matrix.length; i += 4) {
      const start = res_matrix[i]
      if (start !== 0) {
        raw_matrix[i] = 0
        raw_matrix[i + 1] = 0
        raw_matrix[i + 2] = 0
      }
    }
    ctx?.clearRect(0, 0, raw_img.naturalWidth, raw_img.naturalHeight)

    const new_imageData = new ImageData(raw_matrix, raw_img.naturalWidth, raw_img.naturalHeight, { colorSpace: 'srgb' })

    ctx?.putImageData(new_imageData, 0, 0);

    return {
      url: canvas.toDataURL('image/jpg', 1), data: []
    }
  }

  return {
    url, data: []
  }
}
