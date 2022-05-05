var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name !== creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        } else {
            var result = creep.claimController(creep.room.controller)
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if (result === -15) {
                console.log("Your Global Control Level is not enough.")
            }
        }
    }
};

module.exports = roleClaimer;