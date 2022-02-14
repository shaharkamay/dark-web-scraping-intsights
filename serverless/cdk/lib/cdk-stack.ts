import { aws_lambda, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  RestApi,
  EndpointType,
  PassthroughBehavior,
  LambdaIntegration,
  LambdaRestApi,
  Cors,
} from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
import { Function } from 'aws-cdk-lib/aws-lambda';
dotenv.config();

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getPastes = new NodejsFunction(this, 'get_pastes', {
      functionName: 'get_pastes',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/getPastes/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });
    const upsertPastes = new NodejsFunction(this, 'upsert_pastes', {
      functionName: 'upsert_pastes',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/upsertPastes/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });

    const getAlerts = new NodejsFunction(this, 'get_alerts', {
      functionName: 'get_alerts',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/getAlerts/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });

    const getKeywords = new NodejsFunction(this, 'get_keywords', {
      functionName: 'get_keywords',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/getKeywords/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });
    const deleteKeyword = new NodejsFunction(this, 'delete_keyword', {
      functionName: 'delete_keyword',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/deleteKeyword/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });
    const addKeyword = new NodejsFunction(this, 'add_keyword', {
      functionName: 'add_keyword',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/addKeyword/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });
    const upsertKeywords = new NodejsFunction(this, 'upsert_keywords', {
      functionName: 'upsert_keywords',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: './functions/upsertKeywords/index.ts',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || '',
      },
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
        nodeModules: ['@prisma/client', 'prisma'],
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`];
          },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cd ${outputDir}`,
              `npx prisma generate`,
              `rm -rf node_modules/@prisma/engines`,
              `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
            ];
          },
        },
      },
      timeout: Duration.minutes(3),
    });

    const api = new RestApi(this, 'dark-web-scraping-insights-api', {
      deployOptions: { stageName: 'api' },
      restApiName: 'dark-web-scraping-insights-api',
      endpointTypes: [EndpointType.REGIONAL],
    });

    const pastes = api.root.addResource('pastes');

    pastes.addMethod(
      'GET',
      new LambdaIntegration(getPastes, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );
    pastes.addMethod(
      'POST',
      new LambdaIntegration(upsertPastes, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );

    const alerts = api.root.addResource('alerts');

    alerts.addMethod(
      'GET',
      new LambdaIntegration(getAlerts, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );

    const keywords = api.root.addResource('keywords');

    keywords.addMethod(
      'GET',
      new LambdaIntegration(getKeywords, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );
    keywords.addMethod(
      'DELETE',
      new LambdaIntegration(deleteKeyword, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );
    keywords.addMethod(
      'POST',
      new LambdaIntegration(addKeyword, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );
    keywords.addMethod(
      'PUT',
      new LambdaIntegration(upsertKeywords, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      })
    );
  }
}
