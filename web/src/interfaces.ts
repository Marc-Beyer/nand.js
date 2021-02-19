enum GATE_TYPE{
    CONST_HIGH_Gate,
    CONST_LOW_Gate,
    Switch,
    Buffer,
    NOT,
    AND,
    OR,
    NAND,
    NOR,
    XOR,
    XNOR,
    Lamp,
    Display,
    Lable,
    Connection,
    Clock,
    Button,
    Segment_Display,
    RS_Latch,
    RCS_Latch
}

enum IO_TYPE{
    Input,
    Output
    
}

interface Color{
    main: string,
    active: string,
    background: string,
    dark: string,
    highlight: string
}

interface Options{
    strokeSize: number,
    negatedIOStyle: number,
    COLOR: Color,
    gateStyle: number,
    highlightedStroke: number
}

interface Position2D{
    x: number,
    y: number
}

interface Transform{
    position: Position2D,
    width: number,
    height: number
}

//TODO
// gate: gate that this gate is connected to
// outputNr: the outputNr of the output from this gate
// inputNr: the inputNr of the gate that this gate is connected to
interface Connection{
    fromGate: Gate,
    fromOutputNr: number,
    toGate: Gate,
    toInputNr: number
}

interface IO{
    gate: Gate,
    ioNr: number,
    ioType: IO_TYPE
}