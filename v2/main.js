require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');
var roleClaimer = require('role.claimer');

var HOME = 'W1N3';
var W2N3 = 'W2N3';
var W1N4 = 'W1N4';
var W2N4 = 'W2N4';
var W1N2 = 'W1N2';
var W3N3 = 'W3N3';
var W1N5 = 'W1N5';

module.exports.loop = function () {
    
    var minNumberOfHarvesters = 0;
    var minNumberOfUpgraders = 1;
    var minNumberOfBuilders = 2;
    var minNumberOfRepairers = 2;
    var minNumberOfWallRepairers = 1;
    var minNumberOfLongDistanceHarvestersW2N3 = 2;
    var minNumberOfLongDistanceHarvestersW1N4 = 4;
    var minNumberOfLongDistanceHarvestersW2N4 = 2;
    var minNumberOfLongDistanceHarvestersW1N2 = 2;
    var minNumberOfLongDistanceHarvestersW3N3 = 2;
    var minNumberOfLongDistanceHarvestersW1N5 = 2;

    
    
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'wallRepairer');
    var longDistanceHarvestersW2N3 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W2N3
    );
    var longDistanceHarvestersW1N4 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W1N4
    );
    var longDistanceHarvestersW2N4 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W2N4
    );
    var longDistanceHarvestersW1N2 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W1N2
    );
    var longDistanceHarvestersW3N3 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W3N3
    );
    var longDistanceHarvestersW1N5 = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === 'longDistanceHarvester' && creep.memory.target === W1N5
    );

    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer');

    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Builders: ' + builders.length);
    console.log('Repairer: ' + repairers.length);
    console.log('Wall-Repairer: ' + wallRepairers.length);
    console.log('longDistanceHarvesterW2N3: ' + longDistanceHarvestersW2N3.length);
    console.log('longDistanceHarvesterW1N4: ' + longDistanceHarvestersW1N4.length);
    console.log('longDistanceHarvesterW2N4: ' + longDistanceHarvestersW2N4.length);
    console.log('longDistanceHarvesterW1N2: ' + longDistanceHarvestersW1N2.length);
    console.log('longDistanceHarvesterW3N3: ' + longDistanceHarvestersW3N3.length);
    console.log('longDistanceHarvesterW1N5: ' + longDistanceHarvestersW1N5.length);
    console.log('claimers: ' + claimers.length);

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
        Game.spawns['Spawn1'].createCustomCreep(energy, repairerName, 'repairer');
    } else if (wallRepairers.length < minNumberOfWallRepairers) {
        var wallRepairerName = 'Wall-Repairer' + Game.time;
        console.log('Spawning new wall repairer: ' + wallRepairerName);
        Game.spawns['Spawn1'].createCustomCreep(energy, wallRepairerName, 'wallRepairer');
    } else if (builders.length < minNumberOfBuilders) {
        var builderName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + builderName);
        Game.spawns['Spawn1'].createCustomCreep(energy, builderName, 'builder');
    } else if (harvesters.length < minNumberOfHarvesters) {
        var harvesterName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + harvesterName);
        Game.spawns['Spawn1'].createCustomCreep(energy, harvesterName, 'harvester');
    } else if (longDistanceHarvestersW2N3.length < minNumberOfLongDistanceHarvestersW2N3) {
        var longDistanceHarvesterNameW2N3 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW2N3);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW2N3,
            4,
            HOME,
            W2N3,
            0);
    } else if (longDistanceHarvestersW1N4.length < minNumberOfLongDistanceHarvestersW1N4) {
        var longDistanceHarvesterNameW1N4 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW1N4);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW1N4,
            3,
            HOME,
            W1N4,
            0);
    } else if (longDistanceHarvestersW2N4.length < minNumberOfLongDistanceHarvestersW2N4) {
        var longDistanceHarvesterNameW2N4 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW2N4);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW2N4,
            3,
            HOME,
            W2N4,
            0);
    } else if (longDistanceHarvestersW1N2.length < minNumberOfLongDistanceHarvestersW1N2) {
        var longDistanceHarvesterNameW1N2 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW1N2);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW1N2,
            2,
            HOME,
            W1N2,
            0);
    } else if (longDistanceHarvestersW3N3.length < minNumberOfLongDistanceHarvestersW3N3) {
        var longDistanceHarvesterNameW3N3 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW3N3);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW3N3,
            3,
            HOME,
            W3N3,
            0);
    } else if (longDistanceHarvestersW1N5.length < minNumberOfLongDistanceHarvestersW1N5) {
        var longDistanceHarvesterNameW1N5 = 'longDistanceHarvester' + Game.time;
        console.log('Spawning new longDistanceHarvester: ' + longDistanceHarvesterNameW1N5);
        Game.spawns['Spawn1'].createLongDistanceHarvester(
            energy,
            longDistanceHarvesterNameW1N5,
            1,
            HOME,
            W1N5,
            0);
    } else if (Game.spawns['Spawn1'].memory.claimRoom !== undefined) {
        var claimerName = 'Claimer' + Game.time;
        console.log('Spawning new claimer: ' + claimerName);
        var result = Game.spawns['Spawn1'].createClaimer(Game.spawns.Spawn1.memory.claimRoom, claimerName);
        if (!(result < 0)) {
            delete Game.spawns['Spawn1'].memory.claimRoom;
        }
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
        if(creep.memory.role === 'longDistanceHarvester') {
            roleLongDistanceHarvester.run(creep);
        }
        if(creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }
    }

    var towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers) {
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            tower.attack(target);
        }
    }
}
