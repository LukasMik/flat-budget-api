import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function apiDecoratorsCreate(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Create new ${entityName}` }),
    ApiResponse({
      status: 201,
      description: `${entityName} has been successfully created.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'create'),
  );
}

export function apiDecoratorsFindAll(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get all ${entityName}s` }),
    ApiResponse({
      status: 200,
      description: `Successfully retrieved all ${entityName}s.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'get'),
  );
}

export function apiDecoratorsFindOne(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${entityName} by id` }),
    ApiResponse({
      status: 200,
      description: `Successfully retrieved ${entityName} by id.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'get'),
  );
}

export function apiDecoratorsDelete(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Delete ${entityName} by id` }),
    ApiResponse({
      status: 200,
      description: `Successfully deleted ${entityName} by id.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'delete'),
  );
}

export function apiDecoratorsFindByRoomId(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${entityName} by room id` }),
    ApiResponse({
      status: 200,
      description: `Successfully retrieved ${entityName} by room id.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'get'),
  );
}

export function apiDecoratorsFindByMaterialId(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${entityName} by material id` }),
    ApiResponse({
      status: 200,
      description: `Successfully retrieved ${entityName} by material id.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'get'),
  );
}

export function apiDecoratorsFindByProjectId(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${entityName} by project id` }),
    ApiResponse({
      status: 200,
      description: `Successfully retrieved ${entityName} by project id.`,
    }),
    ...apiDecoratorsGeneralRespones(entityName, 'get'),
  );
}

export function apiDecoratorsGetPrice(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get price of ${entityName}` }),
    ...apiDecoratorsGeneralRespones(entityName, 'get price of'),
  );
}

export function apiDecoratorsGetTotalPriceByRoom(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get total price of ${entityName} by room id` }),
    ...apiDecoratorsGeneralRespones(entityName, 'get total price of'),
  );
}

export function apiDecoratorsGetTotalPriceByProject(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get total price of ${entityName} by project id` }),
    ...apiDecoratorsGeneralRespones(entityName, 'get total price of'),
  );
}

export function apiDecoratorsFindAllUsedMaterials(entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get all used materials of ${entityName}` }),
    ...apiDecoratorsGeneralRespones(entityName, 'get all used materials of'),
  );
}

export function apiDecoratorsGeneralRespones(
  entityName: string,
  action: string,
) {
  return [
    ApiResponse({
      status: 400,
      description: `Bad Request - Invalid input for ${entityName}.`,
    }),
    ApiResponse({
      status: 401,
      description: `Unauthorized - User is not authorized to ${action} ${entityName}.`,
    }),
    ApiResponse({
      status: 403,
      description: `Forbidden - User does not have permission to ${action} ${entityName}.`,
    }),
    ApiResponse({
      status: 404,
      description: `Not Found - ${entityName} not found.`,
    }),
    ApiResponse({
      status: 500,
      description: `Internal Server Error - An error occurred while ${action} ${entityName}.`,
    }),
  ];
}
