var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.working = false;
        }

        if(creep.store.getFreeCapacity() > 0 && creep.memory.working === true) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                filter: (src) => {
                    return src.energy > 0;
                }
            });
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

        if (creep.memory.working === false) {

            if (creep.store.getFreeCapacity() === creep.store.getCapacity() ){
                creep.memory.working = true;
            }

            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                            || structure.structureType === STRUCTURE_SPAWN
                            || structure.structureType === STRUCTURE_TOWER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (source === null){
                source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER ||
                                structure.structureType === STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }

            if(creep.transfer(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }

};

module.exports = roleHarvester;