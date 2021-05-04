import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const jobs = async (): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query jobs {
        jobs {
                status
                message
                jobs {
                    title
                    description
                    phone
                    link
                }
              }
            }
      `,
    variables: {},
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.jobs) {
        if (res.data.data.jobs.status === 'SUCCESS') {
          result = {
            status: res.data.data.jobs.status,
            jobs: res.data.data.jobs.jobs,
          };
          toast.success(res.data.data.jobs.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.jobs.status,
          };
          toast.error(res.data.data.jobs.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else if (res.data.errors) {
        toast.error(Persian.technicalProblem, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        result = {
          status: 'FAILED',
        };
      }
    })
    .catch((err) => {
      toast.error(Persian.technicalProblem, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      result = {
        status: 'FAILED',
      };
    });
  return result;
};
