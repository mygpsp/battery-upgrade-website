'use client';

import { useState, useEffect } from 'react';

export default function ViewOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Note: This won't work with the current setup because functions-framework
        // doesn't support multiple HTTP functions. 
        // For now, check the terminal logs where the Cloud Function is running.
        setLoading(false);
        setError('View orders in the terminal where "npm start" is running in the functions directory');
    }, []);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        📦 View Orders
                    </h1>
                    <p className="text-xl text-slate-300">
                        Local Development Mode
                    </p>
                </div>

                <div className="glass p-8 md:p-12 rounded-2xl">
                    <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold text-blue-400 mb-3">
                            🔍 How to View Orders in Local Development
                        </h2>
                        <div className="text-slate-300 space-y-3">
                            <p>
                                <strong>Option 1: Terminal Logs</strong> (Easiest)
                            </p>
                            <p className="text-sm text-slate-400">
                                Check the terminal where you ran <code className="bg-slate-800 px-2 py-1 rounded">cd functions && npm start</code>
                            </p>
                            <p className="text-sm text-slate-400">
                                You'll see output like:
                            </p>
                            <pre className="bg-slate-900 p-4 rounded-lg text-xs overflow-x-auto mt-2">
                                {`📦 Received order: {
  "name": "John Doe",
  "email": "john@example.com",
  ...
}
💾 Order saved locally (in-memory)
📊 Total orders in memory: 1
✅ Order processed successfully: ORD-1768287078559-92`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">
                            ⚠️ Why Can't I See Orders Here?
                        </h2>
                        <p className="text-slate-300 text-sm">
                            The <code className="bg-slate-800 px-2 py-1 rounded">functions-framework</code> (used for local development)
                            only supports one HTTP function at a time. The <code className="bg-slate-800 px-2 py-1 rounded">/view-orders</code> endpoint
                            can't be accessed separately.
                        </p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-green-400 mb-3">
                            ✅ In Production
                        </h2>
                        <p className="text-slate-300 text-sm mb-3">
                            When deployed to Google Cloud, orders are saved to Firestore and you can:
                        </p>
                        <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                            <li>View orders in the Firestore console</li>
                            <li>Build an admin dashboard</li>
                            <li>Query orders with the Firestore SDK</li>
                            <li>Set up email notifications</li>
                        </ul>
                    </div>

                    <div className="mt-8 p-6 bg-slate-800/50 rounded-lg">
                        <h3 className="text-lg font-bold text-white mb-3">
                            📝 Current Orders (from terminal logs)
                        </h3>
                        <p className="text-slate-400 text-sm mb-4">
                            To see your orders, check the terminal output where the Cloud Function is running.
                            Look for lines starting with "📦 Received order" and "✅ Order processed successfully".
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="/order"
                                className="btn-primary bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                            >
                                Submit New Order
                            </a>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
