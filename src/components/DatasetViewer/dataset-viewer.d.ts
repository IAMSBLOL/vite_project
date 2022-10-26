
declare namespace DatasetViewer_V1 {
    interface FabricCtx extends fabric.Canvas {
        isDragging: boolean;
        lastPosX: any;
        lastPosY: any
    }

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
        // parrentNode: HTMLElement | null;
    }

    type FbIns = fabric.Canvas | fabric.StaticCanvas | null
}
