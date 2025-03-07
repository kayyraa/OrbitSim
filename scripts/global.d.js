globalThis.Scene = document.querySelector(".Scene");
globalThis.TrailContainer = document.querySelector(".TrailContainer");

globalThis.Random = (Min, Max) => Math.random() * (Max - Min) + Min;
globalThis.RandomSign = () => Math.random() < 0.5 ? -1 : 1;

globalThis.Vector2 = class {
    constructor(Vector = [0, 0]) {
        this.Vector = Vector;
    }

    get Magnitude() {
        return Math.sqrt(this.Vector[0] ** 2 + this.Vector[1] ** 2);
    }

    get Dot() {
        return this.Vector[0] * this.Vector[0] + this.Vector[1] * this.Vector[1];
    }
}

globalThis.Vector3 = class {
    constructor(Vector = [0, 0, 0]) {
        this.Vector = Vector;
    }
}

globalThis.SceneObject = class {
    constructor(Physics = {
        Mass: 1,
        Volume: 1,
        Velocity: new Vector3(),
        Position: new Vector2()
    }, Style = {}) {
        this.Physics = Physics;
        this.Style = Style;
    }

    Append() {
        const Node = document.createElement("div");
        Node.style.left = `${this.Physics.Position.Vector[0]}px`;
        Node.style.top = `${this.Physics.Position.Vector[1]}px`;
        Node.style.width = `${this.Physics.Volume}px`;
        Object.keys(this.Style).forEach(Key => Node.style[Key] = this.Style[Key]);
        Node.style.setProperty("--Width", "0");
        Node.style.setProperty("--Opacity", "0");
        Node.setAttribute("Velocity", JSON.stringify(this.Physics.Velocity.Vector));
        Node.setAttribute("Physics", JSON.stringify(this.Physics));
        Node.setAttribute("Uuid", Uuid(8));
        Node.classList.add("Object");
        Scene.appendChild(Node);
        return Node;
    }
}

globalThis.em = (Value) => Value * 16;

globalThis.Uuid = (Length = 16) => {
    if ((Length & (Length - 1)) !== 0 || Length < 2) return "";

    return Array.from({ length: Length }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).reduce((Acc, Char, Index) =>
        Acc + (Index && Index % (Length / 2) === 0 ? "-" : "") + Char, ""
    );
};

globalThis.NoNaN = (Value) => {
    if (typeof Value === "number") return isNaN(Value) ? 0 : Value;
    if (Array.isArray(Value)) return Value.map(NoNaN);
    if (typeof Value === "object" && Value !== null) {
        Object.keys(Value).forEach(Key => Value[Key] = NoNaN(Value[Key]));
    }
    return Value;
};