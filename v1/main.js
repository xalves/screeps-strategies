require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer')

module.exports.loop = function () {
    
    var minNumberOfHarvesters = 6;
    var minNumberOfUpgraders = 1;
    var minNumberOfBuilders = 1;
    var minNumberOfRepairers = 1;
    var minNumberOfWallRepairers = 1;
    
    
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders: ' + builders.length);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    console.log('Repairer: ' + repairers.length);
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'wallRepairer');
    console.log('Wall-Repairer: ' + wallRepairers.length);

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    if(harvesters.length === 0) {
        Game.spawns.Spawn1.createCustomCreep(
            Game.spawns.Spawn1.room.energyCapacityAvailable,
            "emergency-creep" + Game.time,
            'harvester'
        )
    }

    if(upgraders.length < minNumberOfUpgraders) {
        var upgraderName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + upgraderName);
        Game.spawns['Spawn1'].createCustomCreep(energy, upgraderName,'upgrader');
    } else if (repairers.length < minNumberOfRepairers) {
        var repairerName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + repairerName);
        Game.spawns['Spawn1'].createCustomCreep(energy, repairerName,'repairer');
    } else if (wallRepairers.length < minNumberOfWallRepairers) {
        var wallRepairerName = 'Wall-Repairer' + Game.time;
        console.log('Spawning new wall repairer: ' + wallRepairerName);
        Game.spawns['Spawn1'].createCustomCreep(energy, wallRepairerName,'wallRepairer');
    } else if (builders.length < minNumberOfBuilders) {
        var builderName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + builderName);
        Game.spawns['Spawn1'].createCustomCreep(energy, builderName,'builder');
    } else if (harvesters.length < minNumberOfHarvesters) {
        var harvesterName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + harvesterName);
        Game.spawns['Spawn1'].createCustomCreep(energy, harvesterName,'harvester');
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role === 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
    }

    var towers = Game.rooms.W1N3.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers) {
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            tower.attack(target);
        }
    }
}
