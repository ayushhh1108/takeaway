import FileSaver from 'file-saver';
import { api } from '../api';
import * as XLSX from 'xlsx';
import isEmpty from 'lodash/isEmpty';
import fxfe_t from '../assets/CarriersLogos/fxfe_t.png'
import abfs_t from '../assets/CarriersLogos/abfs_t.png'
import rdwy_t from '../assets/CarriersLogos/rdwy_t.png'
import saia_t from '../assets/CarriersLogos/saia_t.png'
import sefl_t from '../assets/CarriersLogos/sefl_t.png'
import tfin_t from '../assets/CarriersLogos/tfin_t.png'
import aact_t from '../assets/CarriersLogos/aact_t.png'
import ward_t from '../assets/CarriersLogos/ward_t.png'
import clni_t from '../assets/CarriersLogos/clni_t.png'
import cnwy_t from '../assets/CarriersLogos/cnwy_t.png'
import fwda_t from '../assets/CarriersLogos/fwda_t.png'
import mtvl_t from '../assets/CarriersLogos/mtvl_t.png'
import smtl_t from '../assets/CarriersLogos/smtl_t.png'
import visaCard from '../assets/CreditCardLogo/visa.svg'
import masterCard from '../assets/CreditCardLogo/mastercard.svg'
import americanExpress from '../assets/CreditCardLogo/american-express.svg'
import defaultCard from '../assets/CreditCardLogo/credit-card-default.png'


export const downloadFile = async (url, fileName = 'download') => {
  const blob = await api.get(url).then((r) => r.blob());
  FileSaver.saveAs(blob, fileName);
};

export const getQueryParams = (data) => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(data);
};

export const exportToCSV = (
  headerObj = {}, // must contains table Headers Name with there respective keys
  dataArr = [], // must be an array of objects
  fileName = 'download' // file Name
) => {
  if (!isEmpty(dataArr) && !isEmpty(headerObj)) {
    const mappedLogs = dataArr.map((row) => {
      const temp = {};
      Object.entries(row).map((entity) => temp[headerObj[entity[0]]] = entity[1]);
      return { ...temp };
    });

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(mappedLogs);

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
};

export const getCarrierLogo = (id) => {
  let carriersData = [
    {
      "id": 1,
      "name": "FedEx Freight Priority",
      "src": fxfe_t
    },
    {
        "id": 11,
        "name": "ABF Freight",
        "src":abfs_t
    },
    {
        "id": 20,
        "name": "YRC",
        "src" :rdwy_t
    },
    {
        "id": 21,
        "name": "Saia",
        "src": saia_t
    },
    {
        "id": 22,
        "name": "Southeastern Freight Lines",
        "src":sefl_t
    },
    {
        "id": 24,
        "name": "TForce Freight",
        "src":tfin_t
    },
    {
        "id": 1101,
        "name": "AAA Cooper / MME",
        "src":aact_t
    },
    {
        "id": 3093,
        "name": "Ward Trucking",
        "src":ward_t
    },
    {
        "id": 3555,
        "name": "Clear Lane Freight",
        "src":clni_t
    },
    {
        "id": 3772,
        "name": "XPO Logistics",
        "src": cnwy_t
    },
    {
        "id": 159470,
        "name": "ForwardAir (Alt)",
        "src": fwda_t
    },
    {
        "id": 155216,
        "name": "Southwestern Motor Transport",
        "src": smtl_t
    },
    {
      "id": 130937,
      "name": "GLS Freight",
      "src": mtvl_t
  }
  ]
  let logoData = carriersData.find((i)=> Number(i.id) === Number(id))
  let logoSrc = logoData ? logoData.src : fxfe_t
  return logoSrc
}


export const getCreditCardLogo = (type) => {
  let CreditCardData = [
    {
      "type": "Visa",
      "src": visaCard
    },
    {
      "type": "MasterCard",
      "src":masterCard
    },
    {
      "type": "AmericanExpress",
      "src":americanExpress
    },
  ]
  let logoData = CreditCardData.find((i)=>i.type === type)
  let logoSrc = logoData ? logoData.src : defaultCard
  return logoSrc
}