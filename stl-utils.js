const NodeStl = require("node-stl");

function getStlData(stlFile) {
    const stl = new NodeStl(stlFile);
    const stlData = {
        volume: {
            value: stl.volume,
            unit: 'cm^3'
        },
        weight: {
            value: stl.weight,
            unit: 'gm'
        },
        boundingBox: {
            value: stl.boundingBox,
            unit: 'mm'
        },
        area: {
            value: stl.area,
            unit: 'm'
        },
        centerOfMass: {
            value: stl.centerOfMass,
            unit: 'mm'
        }
    };

    return stlData;
}

module.exports = {
    getStlData
}