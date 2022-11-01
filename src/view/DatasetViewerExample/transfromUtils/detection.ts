const example_json = {
  url: 'https://s3.local.cdn.desauto.net/temp/inference/images/c2113c66-2589-4813-b868-c1c24bfb359e.jpg',
  model_type: 'detection',
  result: [
    [
      'car',
      262.6797790527344,
      159.64820861816406,
      298.95721435546875,
      194.625732421875,
      0.86
    ],
    [
      'car',
      285.76690673828125,
      155.3206787109375,
      314.63800048828125,
      178.01869201660156,
      0.71
    ],
    [
      'car',
      308.63616943359375,
      154.6182403564453,
      323.76177978515625,
      170.7762451171875,
      0.55
    ],
    [
      'car',
      295.5721130371094,
      155.2163391,
      320.7208557128906,
      173.36013,
      0.55
    ]
  ]

}

export const detection = () => {
  console.log(1)

  try {
    const { url, result } = example_json

    const data:any[] = []
    for (const o of result) {
      const [label, x, y, x1, y1] = o
      const w = (x1 as number) - (x as number)
      const h = (y1 as number) - (y as number)
      data.push({
        label,
        rectData: [x, y, w, h],
        type: 'CustomRect'
      })
    }
    return {
      url, data
    }
  } catch (e) {

  }
}
