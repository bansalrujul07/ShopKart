import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-pink-50">

            {/* Hero Section */}
            <section className="px-6 py-12">
                <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-8 py-12 md:grid-cols-2 md:px-14">

                    <div>
                        <p className="mb-3 font-semibold text-pink-500">
                            Welcome to ShopKart
                        </p>

                        <h1 className="text-4xl font-bold leading-tight text-gray-800 md:text-5xl">
                            Find things you'll
                            <span className="text-pink-500"> love.</span>
                        </h1>

                        <p className="mt-5 max-w-lg text-gray-600">
                            Discover products made for your everyday needs,
                            all in one simple shopping experience.
                        </p>

                        <button
                            onClick={() => navigate("/products")}
                            className="mt-7 rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
                        >
                            Shop Now
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/70 shadow-sm md:h-80 md:w-80">
                            <span className="text-7xl">🛍️</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* Categories */}
            <section className="mx-auto max-w-7xl px-6 pb-14">

                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                    Explore Categories
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

                    <div className="rounded-2xl bg-blue-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Electronics
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Gadgets for everyday life
                        </p>
                    </div>

                    <div className="rounded-2xl bg-pink-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Fashion
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Style for every occasion
                        </p>
                    </div>

                    <div className="rounded-2xl bg-purple-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Books
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Stories and knowledge
                        </p>
                    </div>

                    <div className="rounded-2xl bg-green-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Home
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Make your space feel better
                        </p>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Home;