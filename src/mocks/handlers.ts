import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost/user/create', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  http.post('http://localhost/user/list', async ({ request }) => {
    const { page, size, filterBy, requestType } = await request.json() as Request;


    let content = [];
    for (let i = 1; i <= 100; i++) {

      const item = {
        id: `${i}~uuid`,
        code: `${i}`,
        name: `USER ${i}`,
        email: `user${i}@example.com`,
        mobileNumber: `08${String(i).padStart(2, '0')}123456${String(i).padStart(2, '0')}`,
        timezone: 'WIB',
        userType: 'INTERNAL',
        employeeBranch: `BRANCH ${i}`,
        employeeDivision: `DIVISION ${i}`,
        active: true,
        remarks: '',
        deleted: isGanjil(i),
        deletedReason: '',
        createdBy: `USER ${i} (${i})`,
        createdDate: '2025-01-07T05:27:16Z',
        modifiedBy: `USER ${i} (${i})`,
        modifiedDate: '2025-01-07T05:27:16Z'
      };

      content.push(item);
    }

    if (requestType === 'BROWSE') {
      content = content.filter(x => x.deleted === false);
    }

    const startIndex = (page - 1) * size;
    const paginated = content.slice(startIndex, startIndex + size);

    const response: Response = {
      "status": "Success",
      "code": 0,
      "responseCode": 20000101300,
      "responseMessage": "USER Get List Successfully",
      "result": {
        "content": paginated,
        "number": page,
        "numberOfElements": size,
        "totalElements": 100,
        "totalPages": 10,
        "size": size
      }
    }

    return HttpResponse.json(response);
  }),
]

function isGanjil(index: number): boolean {
  return index % 2 !== 0;
}

interface Response {
  "status": string,
  "code": number,
  "responseCode": number,
  "responseMessage": string,
  "result": {
    "content": any[],
    "number": number,
    "numberOfElements": number,
    "totalElements": number,
    "totalPages": number,
    "size": number
  }
}

interface Request {
  "requestType": string,
  "size": number,
  "page": number,
  "sortBy": Record<string, any>,
  "filterBy": Record<string, any>
}
