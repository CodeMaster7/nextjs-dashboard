import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function GET() {
	try {
		console.log('🧹 Cleaning up duplicate data...')

		// Delete data instead of dropping tables (faster, no timeout)
		console.log('🗑️ Deleting invoices...')
		await sql`DELETE FROM invoices`

		console.log('🗑️ Deleting customers...')
		await sql`DELETE FROM customers`

		console.log('🗑️ Deleting users...')
		await sql`DELETE FROM users`

		console.log('🗑️ Deleting revenue...')
		await sql`DELETE FROM revenue`

		console.log('✅ All data deleted successfully')

		return Response.json({
			message: 'Database cleaned up successfully - all data deleted'
		})
	} catch (error) {
		console.error('❌ Cleanup failed:', error)
		return Response.json({ error }, { status: 500 })
	}
}
