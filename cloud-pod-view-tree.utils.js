// For Cloud Pod View Tree tools
import { faker } from '@faker-js/faker';


// Failed Response for the API
export const FailedRequestMsg = { result: 'Not Found' };

export const healthStatus = { Critical: 'Critical', OK: 'Ok', Warning: 'Warning' };
export const drawerType = [
  'APA',
  'BF',
  'CS',
  'JBF',
  'JBD',
  'MS1',
  'MS2',
  'PCIESW',
  'SS',
  'TF',
  'SN',
];
export const uidStatus = ['Blinking', 'Off'];

export const APIParentKey = {
  POD: 'pod_name',
  GROUP: 'group',
  RACK: 'rack',
  DRAWER: 'drawer',
}

// Mock Group Schema data.
let GroupSchemaList = GeneralGroupsSchema(100);


/**
 * General the Mock Group data of the Schema.
 * @description : Default we create 100 mock Group schema data to do pagination.
 * @param numberOfGrp : The number of groups to generate.
 */
function GeneralGroupsSchema(numberOfGrp = 20) {
  let GroupList = [];
  let grp = {
    color: '#1C7BCF',
    ui_id: 'GRP-default-no-group',
    name: 'RackServer-Default',
    racks: GeneralRacksSchema(Math.floor(Math.random() * 100)),
    workstation: false,
    parentNode: {
      podName: 'Pod Manager',
    },
  };
  GroupList.push(grp);

  for (let num = 1; num < numberOfGrp; num++) {
    grp = {
      color: faker.color.rgb({ prefix: '#', casing: 'upper' }),
      ui_id: `GRP-uiid-${num}`,
      name: `RackServer-Group${num}`,
      racks: GeneralRacksSchema(Math.floor(Math.random() * 100)),
      workstation: false,
      parentNode: {
        podName: 'Pod Manager',
      },
    };
    GroupList.push(grp);
  }

  return GroupList;
}


/**
 * General Mock Rack Schema data.
 * @param numberOfRacks : The number of racks to generate.
 * @returns RackList : An array of mock Rack data.
 */
function GeneralRacksSchema(numberOfRacks = 100) {
  let RackList = [];
  const rackSize = [12, 24, 42, 52, 58];
  for (let num = 0; num < numberOfRacks; num++) {
    let rack = {
      size: rackSize[Math.floor((Math.random() * 10) % 5)],
      description: `Description of Rack ${num}`,
      drawers: [],
      locationId: `Rack-${num}`,
      ui_id: `RCK-${faker.datatype.uuid()}`,
      name: faker.name.firstName(),
    };
    rack.drawers = GeneralDrawersSchema(rack.size, rack.ui_id);
    RackList.push(rack);
  }
  return RackList;
}

/**
 * General the random Mock Drawers list of the Rack.
 * 3 types of the SKU :
 *    1U : 'SYS-120C-TN10R'.
 *    2U : 'SYS-220HE-FTNR'.
 *    4U : 'SYS-420GP-TNR'.
 * or empty slot.
 * @param rackSize : A number of Rack Size.
 * @param rackUIID : String. to Find out the Rack UIID is exist in the POD or not.
 * @returns : Return the random Drawer list of the Rack.
 */
export function GeneralDrawersSchema(rackSize = 52, rackUIID) {
  const SKUName1U = { name: 'SYS-120C-TN10R', size: 1 };
  const SKUName4U = { name: 'SYS-420GP-TNR', size: 4 };
  const SKUName2U = { name: 'SYS-220HE-FTNR', size: 2 };
  let mockDrawerList = [];
  for (let loc = 0; loc < rackSize; loc++) {
    const XU = Math.floor((Math.random() * 10) % 4);
    if (XU === 1) {  // 1U Drawer
      let drawer = {
        SKU: SKUName1U.name,
        rackmountSize: SKUName1U.size,
        locationId: loc + 1,
        system_serial: `${rackUIID}-${loc}`,
        ui_id: `DRW-${faker.datatype.uuid()}`,
        type: 'SN',
        manufacturer: 'Supermicro',
        modules: [
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 1,
            ipv4: faker.internet.ipv4(),
            ui_id: faker.datatype.uuid(),
          },
        ],
      };
      mockDrawerList.push(drawer);
    } else if (XU === 2) {  //2U Drawer
      if (loc + 1 >= rackSize) {  // over the rack size
        continue;
      }
      let drawer = {
        SKU: SKUName2U.name,
        rackmountSize: SKUName2U.size,
        locationId: loc + 1,
        system_serial: `${rackUIID}-${loc}`,
        ui_id: `DRW-${faker.datatype.uuid()}`,
        type: 'SN',
        manufacturer: 'Supermicro',
        modules: [
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'A',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          },
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'C',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          }
        ],
      };
      loc += SKUName2U.size - 1;
      mockDrawerList.push(drawer);
    } else if (XU === 3) { // 4U
      if (loc + 3 >= rackSize) { // over the rack size
        continue;
      }
      let drawer = {
        SKU: SKUName4U.name,
        rackmountSize: SKUName4U.size,
        locationId: loc + 1,
        system_serial: `${rackUIID}-${loc}`,
        ui_id: `DRW-${faker.datatype.uuid()}`,
        type: 'SN',
        manufacturer: 'Supermicro',
        modules: [
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'A',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          },
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'C',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          },
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'D',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          },
          {
            credential: {
              username: 'ADMIN',
              password: 'ADMIN',
            },
            support_roce: false,
            mac: faker.internet.mac(),
            locationId: 'B',
            ipv4: faker.internet.ipv4(),
            ui_id: `SYS-${faker.datatype.uuid()}`,
          },
        ],
      };
      loc += SKUName4U.size - 1;
      mockDrawerList.push(drawer);
    } else {
      // empty slot
    }
  }
  return mockDrawerList;
}

/**
 * General the Mock Group array.
 * @param numberOfGrp : number of groups to be returned
 * @returns : An array of groups
 */
export function GetTreeGroups() {
  let mockGroups = [];
  for (let idx = 0; idx < GroupSchemaList.length; idx++) {
    let grp = {};
    grp.Metrics = '0';
    grp.Name = GroupSchemaList[idx].name;
    grp.ui_id = GroupSchemaList[idx].ui_id;
    grp.Leaf = GroupSchemaList[idx].racks.length > 0 ? false : true;
    mockGroups.push(grp);
  }
  return mockGroups;
}

/**
 * General the Mock Rack array.
 * @param numberOfRack : number of racks to be returned
 * @returns : An array of racks
 */
export function GetTargetTreeRack(grpUIID) {
  const grpList = GroupSchemaList.filter((grp) => grp.ui_id === grpUIID);
  const targetGrp = grpList[0];
  let mockRacks = [];

  for (let idx = 0; idx < targetGrp.racks.length; idx++) {
    let rack = {};
    rack.Metrics = '0';
    rack.Name = targetGrp.racks[idx].name;
    rack.Location = targetGrp.racks[idx].locationId;
    rack.Health = healthStatus[Math.floor(Math.random() * healthStatus.length)];
    rack.ui_id = targetGrp.racks[idx].ui_id;
    rack.Leaf = false;
    mockRacks.push(rack);
  }
  return mockRacks;
}

/**
 * General the Mock of Drawer array.
 * @param numberOfDrawer : number of drawers to be returned
 * @returns : An array of Drawers
 */
export function GetTargetTreeDrawer(rackUIID) {
  // console.log(rackUIID)
  let targetRack = {
    size: 12,
    description: '',
    drawers: [],
    locationId: '',
    ui_id: '',
    name: ''
  };

  for (let grpIdx = 0; grpIdx < GroupSchemaList.length; grpIdx++) {
    let isFindRack = false;
    for (let rackIdx = 0; rackIdx < GroupSchemaList[grpIdx].racks.length; rackIdx++) {
      if (GroupSchemaList[grpIdx].racks[rackIdx].ui_id === rackUIID) {
        targetRack = GroupSchemaList[grpIdx].racks[rackIdx];
        isFindRack = true;
        break;
      }
    }
    if (isFindRack) {
      break;
    }
  }

  if (targetRack.drawers.length > 0) {
    let TreeDrawersList = [];
    for (let i = 0; i < targetRack.drawers.length; i++) {
      let drawer = {
        Health: '',
        system_serial: '',
        sku: '',
        drawer_type: '',
        LocationId: '',
        ui_id: '',
        product_family: '',
        ComputerSystems: [],
        Leaf: false
      };

      drawer.Health = healthStatus[Math.floor(Math.random() * healthStatus.length)];
      drawer.system_serial = targetRack.drawers[i].system_serial;
      drawer.sku = targetRack.drawers[i].SKU;
      drawer.drawer_type = targetRack.drawers[i].type;
      drawer.LocationId = targetRack.drawers[i].locationId;
      drawer.ui_id = targetRack.drawers[i].ui_id;
      drawer.product_family = targetRack.drawers[i].manufacturer;
      drawer.Leaf = false;
      drawer.ComputerSystems = GeneralTreeSNAppliance(targetRack.drawers[i].modules, drawer.sku);

      TreeDrawersList.push(drawer);
    }
    return TreeDrawersList;
  }

  return [];
}

/**
 * General mock Compute System array.
 * The maximum number of Compute System is 8 only for BF.
 * Otherwise, the number of Compute System is random between 1 and 4.
 * @param numberOfSN : Number of compute system will be generated.
 * @returns : An array of compute system
 */
export function GeneralTreeSNAppliance(modules, DRWSKU) {
  let SNList = [];
  for (let idx = 0; idx < modules.length; idx++) {

    let sn = {};
    sn.sku = DRWSKU;
    sn.Exception = Math.random() > 0.5;
    sn.StorageAddress = null;
    sn.Uuid = faker.datatype.uuid();
    sn.Unauthorized = Math.random() > 0.5;
    sn.StorageInstalled = false;
    sn.StorageType = null;
    sn.ComputeSysLocation = `Rack:Drawer-${modules[idx].locationId}`;
    sn.Uid = uidStatus[Math.floor(Math.random() * uidStatus.length)];
    sn.Health = healthStatus[Math.floor(Math.random() * healthStatus.length)];
    sn.Location = modules[idx].locationId;
    sn.gpu_models = {};
    sn.Allocated = Math.random() > 0.5
    sn.ui_id = modules[idx].ui_id;
    sn.Stale = Math.random() > 0.5;
    sn.Ipv4 = modules[idx].ipv4;
    sn.Leaf = true;
    SNList.push(sn);
  }
  return SNList;
}

/**
 * Get Pod node Schema data by page.
 */
export function getPageofPodSchemaData(GrpPerPage = 20, TargetPage = 1) {
  let groups = [];
  let currentPage = TargetPage;
  let totalPages = Math.ceil(GroupSchemaList.length / GrpPerPage);
  let totalGroups = GroupSchemaList.length;
  let startIndex = 1;
  let endIndex = 20;
  let resp = {
    entries: GrpPerPage,
    current_page: currentPage,
    total_page: totalPages,
    total_groups: totalGroups,
    groups: [],
  };
  startIndex = (TargetPage - 1) * GrpPerPage;
  endIndex = startIndex + GrpPerPage;
  // groups = GroupSchemaList.slice(startIndex, endIndex);
  for (let grpIdx = startIndex; grpIdx < endIndex; grpIdx++) {
    let grp = JSON.parse(JSON.stringify(GroupSchemaList[grpIdx]));

    // remove detail drawer information and keep a empty array for performance.
    grp.racks.map((rack) => {
      rack.drawers = [];
      return rack;
    });
    resp.groups.push(grp);
  }
  return resp;
}
