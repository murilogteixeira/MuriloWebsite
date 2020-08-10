import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct MuriloWebsite: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case posts
    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    // Update these properties to configure your website:
    var url = URL(string: "https://murilot.com")!
    var name = "Murilo Teixeira"
    var description = "Blog sobre tecnologia e tutoriais."
    var language: Language { .portuguese }
    var imagePath: Path? { nil }
}

// Customizar nome da sessão Posts para Blog
//extension PublishingStep where Site == MuriloWebsite {
//    static func addDefaultSectionTitles() -> Self {
//        .step(named: "Default section titles") { context in
//            context.mutateAllSections { section in
////                guard section.title.isEmpty else { return }
//
//                switch section.id {
//                case .posts:
//                    section.title = "Blog"
//                default: break
//                }
//            }
//        }
//    }
//}

// This will generate your website using the built-in Foundation theme:
try MuriloWebsite().publish(withTheme: .myTheme)

