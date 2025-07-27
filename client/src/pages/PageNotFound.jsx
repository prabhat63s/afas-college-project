import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

export default function Pagenotfound() {
  return (
    <Layout>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-emerald-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">पृष्ठ नहीं मिला</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">क्षमा करें, हम वह पेज नहीं ढूंढ सके जिसे आप ढूंढ रहे थे।</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="text-white border shadow-md border-emerald-500 py-2 px-5 mt-4 rounded-lg bg-emerald-500 hover:bg-white hover:text-emerald-500"
            >
              होम पर वापस जाओ
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
