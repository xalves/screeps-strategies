var roleBuilder = require('role.builder');

var roleWallRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairing = true;
            creep.say('🛡️ repair');
        }

        if (creep.memory.repairing) {
           var walls = creep.room.find(FIND_STRUCTURES, {
               filter: (s) => s.structureType === STRUCTURE_WALL
           });

           var target = undefined

           for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
               target = creep.pos.findClosestByPath(walls, {
                   filter: (w) => w.hits / w.hitsMax < percentage
               });

               if (target != undefined) {
                   break;
               }
           }

           if (target != undefined) {
               if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                   creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff04'}});
               }

           } else {
               roleBuilder.run(creep);
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

module.exports = roleWallRepairer;