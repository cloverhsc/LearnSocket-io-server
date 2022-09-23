import {
  APIParentKey,
  GetTreeGroups,
  FailedRequestMsg,
  GetTargetTreeRack,
  healthStatus,
  GetTargetTreeDrawer,
  getPageofPodSchemaData,
} from './cloud-pod-view-tree.utils.js';

const TreeNodeType = {
  Folder: 'Folder',
  File: 'File',
  Picture: 'Picture',
  Movie: 'Movie',
};

export const getTree = (req, res) => {
  let response = { data: [] };
  let errorRequest = false;
  let queryKey = Object.keys(req.query)[0];
  // console.log(`Query : ${queryKey}`);
  switch (queryKey) {
    case APIParentKey.POD:
      const podName = req.query.pod_name;
      console.log(`Pod Name : ${podName}`);
      if (podName === 'Pod Manager') {
        errorRequest = false;
        response.data = GetTreeGroups();
      } else {
        errorRequest = true;
        response = FailedRequestMsg;
      }
      break;
    case APIParentKey.GROUP:
      let grpUIID = req.query.group;
      errorRequest = false;
      response.data = GetTargetTreeRack(grpUIID);
      break;
    case APIParentKey.RACK:
      let rackUIID = req.query.rack;
      errorRequest = false;
      response.data = GetTargetTreeDrawer(rackUIID);
      break;
    default:
      // send the POD node list back.
      response.data = [
        {
          Name: 'Pod Manager',
          Health: healthStatus.Critical,
          Leaf: false,
        },
      ];
      break;
  }

  if (errorRequest) {
    return res.status(404).send(response);
  } else {
    return res.status(200).send(response);
  }
};

export const getPodDrawerConfig = (req, res) => {
  let response = {};
  let podName = req.query.pod_name;
  let pageNumber = req.query.page;;
  let entriesPerPage = 20;
  let queryKey = Object.keys(req.query)[0];
  let errorRequest = false;
  console.log(`Query : ${queryKey}`);
  console.log(`Pod Name : ${podName}`);
  console.log(`Page Number : ${pageNumber}`);
  podName !== 'Pod Manager' ? (errorRequest = true) : (errorRequest = false);

  if (errorRequest) {
    response = FailedRequestMsg;
    return res.status(404).send(response);
  } else {
    response = getPageofPodSchemaData(entriesPerPage, pageNumber);
    return res.status(200).send(response);
  }

}