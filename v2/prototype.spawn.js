module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, creepName, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }

            return this.createCreep(body, creepName, { role: roleName, working: true})

        };
    StructureSpawn.prototype.createLongDistanceHarvester =
        function (energy, creepName, numberOfWorkParts, home, target, sourceId) {
            var body = [];
            for (let i = 0; i < numberOfWorkParts; i++) {
                body.push(WORK);
            }

            energy -= 150 * numberOfWorkParts;

            var numberOfParts = Math.floor(energy / 100);

            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }

            for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
                body.push(MOVE);
            }

            return this.createCreep(
                body,
                creepName,
                {
                    role: "longDistanceHarvester",
                    home: home,
                    target: target,
                    sourceId: sourceId,
                    working: true
                }
                )
        };

    StructureSpawn.prototype.createClaimer =
        function (target, creepName) {
            return this.createCreep([CLAIM, MOVE], creepName, {role: 'claimer', target: target})
        };
};