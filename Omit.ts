type Person = {
    name: string;
    age: number;
    location: string;
};

type QuantumPerson = Omit<Person, "location">;

// equivalent to
type QuantumPerson = {
    name: string;
    age: number;
};
