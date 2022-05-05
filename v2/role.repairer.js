var roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairing = true;
            creep.say('🧰 repair');
        }

        if (creep.memory.repairing) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (struct) => struct.hits < struct.hitsMax/2 && struct.structureType !== STRUCTURE_WALL
            });

            if (structure !== null) {
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (struct) => struct.hits < struct.hitsMax && struct.structureType !== STRUCTURE_WALL
                });

                if (structure !== null) {
                    if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    roleBuilder.run(creep)
                }
            }
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (src) => {
                    return src.energy > 0;
                }
            });
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleRepairer;