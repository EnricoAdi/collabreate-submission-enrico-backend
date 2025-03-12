/**
 * @interface IRepository
 * @description Interface for template repository classes
 */
export interface IRepository{
    create(...params:any[]):any
    update(...params:any[]):any
    delete(...params:any[]):any
    get(...params:any[]):any
    fetch(...params:any[]):any
}