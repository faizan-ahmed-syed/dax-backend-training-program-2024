// TODO - C: Implement OOPs based routing (like assets.routes.ts)
import { Router,NextFunction, Request, Response } from 'express';
import CategoryController from './categories.controller';


// Create Category
export class CategoryRoutes{
    readonly router: Router = Router();
    private categoryController = new CategoryController()
    constructor(){
        this.initRoutes();
    }
    private initRoutes():void {
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.categoryController.createCategory(req, res)
            }
            catch (e) {
                next(e)
            }
        })
        
        // Get All Categories
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.categoryController.getAllCategories(req, res)
            }
            catch (e) {
                next(e)
            }
        })
        
        // Get Category by ID
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.categoryController.getCategoryById(req, res);
            }
            catch (e) {
                next(e)
            }
        })
        
        // Update Category by ID
        this.router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.categoryController.updateCategory(req, res)
            }
            catch (e) {
                next(e)
            }
        })
        
        // Delete Category by ID
        this.router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.categoryController.deleteCategory(req, res)
            }
            catch (e) {
                next(e)
            }
        })
    }
} 
