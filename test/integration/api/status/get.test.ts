import { resourceLimits } from "worker_threads"
import prisma from "../../../../src/utils/prismaClient"
import orchestrator from '../../orchestrator';

beforeAll(async () => {
    await orchestrator.waitForAllServices();
})

describe("GET on /status", () => {

    async function getStatus() {

        const status = await fetch('http://localhost:3000/api/v1/status', {
            method: 'GET'
        })
        return status
    }

    test("should return a status 200 on success", async () => {
        const result = await getStatus();
        const convertResult = await result.json()
        expect(result.status).toBe(200)
        expect(convertResult.status).toBe('Ok')
    })
    test("Should be returned database version", async () => {
        const result = await getStatus()
        const convertResult = await result.json()
        const versionResult = convertResult.dependencies.database.version

        const version = await prisma.$queryRawUnsafe<any>(
            'SHOW server_version'
        )

        expect(versionResult).toBe(version[0].server_version)
    })
})