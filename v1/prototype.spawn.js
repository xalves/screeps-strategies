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

            return this.createCreep(body, creepName, { role: roleName })

        }
};