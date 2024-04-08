const penales = [
    {id: 0, penal: "todos"},
    {id: 101, penal: "CAÑETE"},
    {id: 102, penal: "HUARAL"},
    {id: 103, penal: "CALLAO"},
    {id: 104, penal: "ICA"},
    {id: 105, penal: "CHINCHA"},
    {id: 106, penal: "HUACHO"},
    {id: 107, penal: "ANCON II"},
    {id: 108, penal: "CASTRO"},
    {id: 109, penal: "ANCON I"},
    {id: 110, penal: "LURIGANCHO"},
    {id: 111, penal: "TRUJILLO"},
    {id: 112, penal: "CHIMBOTE"},
    {id: 113, penal: "HUARAZ"},
    {id: 114, penal: "CHICLAYO"},
    {id: 115, penal: "TUMBES"},
    {id: 116, penal: "AYACUCHO"},
    {id: 117, penal: "HUANCAYO"},
    {id: 118, penal: "HUANUCO"},
    {id: 119, penal: "CAJAMARCA"},
    {id: 120, penal: "CHANCHAMAYO"},
    {id: 121, penal: "CHORRILLOS"},
    {id: 122, penal: "CUSCO"},
    {id: 123, penal: "PTO MALDONADO"},
    {id: 124, penal: "TACNA"},
    {id: 125, penal: "PUNO"},
    {id: 126, penal: "JULIACA"},
    {id: 127, penal: "TARAPOTO"},
    {id: 128, penal: "MOYOBAMBA"},
    {id: 129, penal: "CHACHAPOYAS"}
];

export const getPenalFromID = function (id) {
    const myPenal = penales.filter(penal => penal.id === id) 
    return myPenal[0].penal
}

export default penales;