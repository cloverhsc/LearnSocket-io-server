import { faker } from '@faker-js/faker';
import bodyParser from 'body-parser';
import express from 'express';


export const app = express();
const router = express.Router();


const TreeNodeType = {
  Folder: 'Folder',
  File: 'File',
  Picture: 'Picture',
  Movie: 'Movie',
}
const treeMockData = {
  data: [
    {
      label: 'Documents',
      data: {
        ui_id: faker.database.mongodbObjectId(),
        type: TreeNodeType.Folder,
      },
      children: [
        {
          label: 'Work',
          data: {
            ui_id: faker.database.mongodbObjectId(),
            type: TreeNodeType.Folder,
          },
          children: [
            {
              label: 'Expenses.doc',
              icon: 'pi pi-file',
              data: {
                ui_id: faker.database.mongodbObjectId(),
                type: TreeNodeType.File,
              },
            },
            {
              label: 'Resume.doc',
              icon: 'pi pi-file',
              data: {
                ui_id: faker.database.mongodbObjectId(),
                type: TreeNodeType.File,
              },
            },
          ],
        },
        {
          label: 'Home',
          data: {
            ui_id: faker.database.mongodbObjectId(),
            type: TreeNodeType.Folder,
          },
          children: [
            {
              label: 'Invoices.txt',
              icon: 'pi pi-file',
              data: {
                ui_id: faker.database.mongodbObjectId(),
                type: TreeNodeType.File,
              },
            },
          ],
        },
      ],
    }
  ],
};

export const getTree = (req, res) => {
  res.send(treeMockData);
};



