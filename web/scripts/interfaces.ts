enum GateType{
    Buffer = "Buffer",
    NOT = "NOT",
    AND = "AND",
    OR = "OR",
    NAND = "NAND",
    NOR = "NOR",
    XOR = "XOR",
    XNOR = "XNOR"
}

enum IOType{
    Input,
    Output
    
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
    ioType: IOType
}