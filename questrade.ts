import {config as dotEnvConfig} from 'dotenv';
import axios, {AxiosError, AxiosResponse} from 'axios';

// Setup imports
dotEnvConfig();
axios.defaults.baseURL = process.env.QT_API_SERVER + '/v1/';
axios.defaults.headers.common = {
  'Authorization': `Bearer ${process.env.QT_ACCESS_TOKEN}`,
};

interface Questrade{
  _getAccountRequest: any,
  getAccounts(): Promise<any[]>,
  getAccountBalances(accountNumber: string): Promise<any[]>,
  getActivities(accountNumber: string): Promise<any[]>,
  getOrders(accountNumber: string): Promise<any[]>,
  getExecutions(accountNumber: string): Promise<any[]>,
  getPositions(accountNumber: string): Promise<any[]>,
  getServerTime(): string
};

/**
 * Questrade main object
 */
class Questrade {
  /**
   * Performs a get request and returns the data/errors
   * @param {string} uri API path from: https://www.questrade.com/api/documentation/getting-started
   * @return {Promise<T>} AxiosResponse<any, any>
  */
  getAccountRequest(uri: string) {
    return axios.get(
        'accounts/'+ uri,
    )
        .then((res: AxiosResponse) => {
          if (res.status != 200) {
            throw res;
          }
          console.log(res.data);
        })
        .catch((err: AxiosError) => {
          console.error(err);
        });
  };

  /**
   * Get all the accounts within a Questrade account.
   * @return { Promise<any[]>} All acounts in the Questrade account.
   */
  async getAccounts(): Promise<any[]> {
    const accounts = await this._getAccountRequest('');
    return [];
  };

  /**
   * Get the account balances of an account.
   * @param {string} accountNumber Questrade account number.
   * @return {Promise<any[]>} list of account balanaces of a sub account.
   */
  async getAccountBalances(accountNumber: string): Promise<any[]> {
    const uri = `${accountNumber}/balances`;
    const balances = await this._getAccountRequest(uri);
    return [];
  };

  /**
   * Gets the Questrade accounts activities history.
   * @param {string} accountNumber Questrade account number.
   * @return {any[]} Account activity history.
   */
  async getActivities(accountNumber: string): Promise<any[]> {
    const uri = `${accountNumber}/balances`;
    const activities = await this._getAccountRequest(uri);
    return [];
  };

  /**
   * Get currently placed orders in account
   * @param {string} accountNumber Questrade account number.
   * @return {Promise<any[]>} List of placed orders
   */
  async getOrders(accountNumber: string): Promise<any[]> {
    const uri = `${accountNumber}/balances`;
    const orders = await this._getAccountRequest(uri);
    return [];
  };

  /**
   * Get the executed orders of an account.
   * @param {string} accountNumber Questrade account number.
   * @return {Promise<any[]>} List of executed orders
   */
  async getExecutions(accountNumber: string): Promise<any[]> {
    const uri = `${accountNumber}/balances`;
    const executions = await this._getAccountRequest(uri);
    return [];
  };

  /**
   * Get current account positions.
   * @param {string} accountNumber Questrade account number.
   * @return {Promise<any[]>} Current positions in a Questrade account
   */
  async getPositions(accountNumber: string):  Promise<any[]> {
    const uri = `${accountNumber}/balances`;
    const positions = await this._getAccountRequest(uri);
    return []
  };

  /**
   * Get the Questrade server's time
   * @return {string} The current time on the server in ISO format.
   */
  async getServerTime(): string {
    return axios.get('time')
        .then((res: AxiosResponse) => {
          return res.data.time;
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
  };
}

/**
 * Temporary basic testing of functions
 */
async function test() {
  const a: Questrade = new Questrade();
  await a.getAccounts();
  await a.getAccountBalances(process.env.ACCOUNT_NUMBER ?? '');
  await a.getActivities(process.env.ACCOUNT_NUMBER ?? '');
  await a.getOrders(process.env.ACCOUNT_NUMBER ?? '');
  await a.getExecutions(process.env.ACCOUNT_NUMBER ?? '');
  await a.getPositions(process.env.ACCOUNT_NUMBER ?? '');
  console.log(await a.getServerTime());
}

test();
