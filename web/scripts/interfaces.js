var GATE_TYPE;
(function (GATE_TYPE) {
    GATE_TYPE[GATE_TYPE["CONST_HIGH_Gate"] = 0] = "CONST_HIGH_Gate";
    GATE_TYPE[GATE_TYPE["CONST_LOW_Gate"] = 1] = "CONST_LOW_Gate";
    GATE_TYPE[GATE_TYPE["Switch"] = 2] = "Switch";
    GATE_TYPE[GATE_TYPE["Buffer"] = 3] = "Buffer";
    GATE_TYPE[GATE_TYPE["NOT"] = 4] = "NOT";
    GATE_TYPE[GATE_TYPE["AND"] = 5] = "AND";
    GATE_TYPE[GATE_TYPE["OR"] = 6] = "OR";
    GATE_TYPE[GATE_TYPE["NAND"] = 7] = "NAND";
    GATE_TYPE[GATE_TYPE["NOR"] = 8] = "NOR";
    GATE_TYPE[GATE_TYPE["XOR"] = 9] = "XOR";
    GATE_TYPE[GATE_TYPE["XNOR"] = 10] = "XNOR";
    GATE_TYPE[GATE_TYPE["Lamp"] = 11] = "Lamp";
    GATE_TYPE[GATE_TYPE["Display"] = 12] = "Display";
    GATE_TYPE[GATE_TYPE["Lable"] = 13] = "Lable";
    GATE_TYPE[GATE_TYPE["Connection"] = 14] = "Connection";
    GATE_TYPE[GATE_TYPE["Clock"] = 15] = "Clock";
    GATE_TYPE[GATE_TYPE["Button"] = 16] = "Button";
    GATE_TYPE[GATE_TYPE["Segment_Display"] = 17] = "Segment_Display";
    GATE_TYPE[GATE_TYPE["RS_Latch"] = 18] = "RS_Latch";
    GATE_TYPE[GATE_TYPE["Gated_RS_Latch"] = 19] = "Gated_RS_Latch";
})(GATE_TYPE || (GATE_TYPE = {}));
var IO_TYPE;
(function (IO_TYPE) {
    IO_TYPE[IO_TYPE["Input"] = 0] = "Input";
    IO_TYPE[IO_TYPE["Output"] = 1] = "Output";
})(IO_TYPE || (IO_TYPE = {}));
//# sourceMappingURL=interfaces.js.map