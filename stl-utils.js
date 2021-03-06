const NodeStl = require("node-stl");

function getStlData(stlFile) {
    const stl = new NodeStl(stlFile, {density: 1.00});
    const stlData = {
        volume: {
            value: stl.volume,
            unit: 'cm^3'
        },
        weight: {
            value: stl.weight,
            unit: 'gm',
            converted: stl.weight * 1
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
        },
        otherInfo: {
          name: stlFile
        }
    };

    return stlData;
}

module.exports = {
    getStlData
}
