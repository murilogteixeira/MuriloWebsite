// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "MuriloWebsite",
    products: [
        .executable(
            name: "MuriloWebsite",
            targets: ["MuriloWebsite"]
        )
    ],
    dependencies: [
        .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.6.0")
    ],
    targets: [
        .target(
            name: "MuriloWebsite",
            dependencies: ["Publish"]
        )
    ]
)