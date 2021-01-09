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
    Connection
}

enum IO_TYPE{
    Input,
    Output
    
}

enum COLOR{
    main = "#DDDDDD",
    active = "#FF0000",
    background = "#3B3B3B",
    dark = "#222222"
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