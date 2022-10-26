
// 禁止一切操作
export const disableAnyFuck = (ctx: DatasetViewer_V1.FabricCtx) => {
  // ctx.skipTargetFind = true
  ctx.selection = false
}

// 开启拖拽+缩放
export const setDropAndScale = (ctx: DatasetViewer_V1.FabricCtx) => {
  ctx.on('mouse:wheel', (opt:any) => {
    console.log(11)
    const delta = opt.e.deltaY;
    let zoom = ctx.getZoom();
    // console.warn(0.999 ** delta, 'zoomzoom')
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    // ctx.setZoom(zoom);
    ctx.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })

  ctx.on('mouse:down', (opt:any) => {
    const evt = opt.e;
    // if (evt.altKey === true) {

    // }
    ctx.isDragging = true;
    ctx.selection = false;
    ctx.lastPosX = evt.clientX;
    ctx.lastPosY = evt.clientY;
  });

  ctx.on('mouse:move', (opt:any) => {
    if (ctx.isDragging) {
      const e = opt.e;
      const vpt = ctx.viewportTransform;
      if (vpt) {
        vpt[4] += e.clientX - ctx.lastPosX;
        vpt[5] += e.clientY - ctx.lastPosY;
      }

      ctx.requestRenderAll();
      ctx.lastPosX = e.clientX;
      ctx.lastPosY = e.clientY;
    }
  });

  ctx.on('mouse:up', () => {
    if (ctx.viewportTransform) {
      ctx.setViewportTransform(ctx.viewportTransform); // 得记录下来，画东西得转回来fuck
    }

    ctx.isDragging = false;
    ctx.selection = true;
  });
}
