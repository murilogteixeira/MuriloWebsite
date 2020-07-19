//
//  File.swift
//  
//
//  Created by Murilo Teixeira on 11/07/20.
//

import Plot
import Publish

public extension Theme {
    /// The default "Foundation" theme that Publish ships with, a very
    /// basic theme mostly implemented for demonstration purposes.
    static var myTheme: Self {
        Theme(
            htmlFactory: MyThemeHTMLFactory(),
            resourcePaths: ["Resources/MyTheme/styles.css"]
        )
    }
}

private struct MyThemeHTMLFactory<Site: Website>: HTMLFactory {
    func makeIndexHTML(for index: Index,
                       context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: index, on: context.site),
//            .head(for: index, on: context.site),
            .body(
                .header(for: context, selectedSection: nil),
                .wrapper(
//                    .h1(.text(index.title)),
//                    .p(
//                        .class("description"),
//                        .text(context.site.description)
//                    ),
                    .h2("Posts recentes"),
                    .itemList(
                        for: context.allItems(
                            sortedBy: \.date,
                            order: .descending
                        ),
                        on: context.site
                    )
                ),
                .footer(for: context.site)
            )
        )
    }

    func makeSectionHTML(for section: Section<Site>,
                         context: PublishingContext<Site>) throws -> HTML {
        
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: section, on: context.site),
//            .head(for: section, on: context.site),
            .body(
                .header(for: context, selectedSection: section.id),
                .wrapper(
                    .h1(.text(section.title)),
                    .itemList(for: section.items, on: context.site)
                ),
                .footer(for: context.site)
            )
        )
    }

    func makeItemHTML(for item: Item<Site>,
                      context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: item, on: context.site),
//            .head(for: item, on: context.site),
            .body(
                .class("item-page"),
                .header(for: context, selectedSection: item.sectionID),
                .wrapper(
                    .article(
                        .div(
                            .class("content"),
                            .contentBody(item.body)
                        ),
                        .span("Tagged with: "),
                        .tagList(for: item, on: context.site)
                    )
                ),
                .footer(for: context.site)
            )
        )
    }

    func makePageHTML(for page: Page,
                      context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: page, on: context.site),
//            .head(for: page, on: context.site),
            .body(
                .header(for: context, selectedSection: nil),
                .wrapper(.contentBody(page.body)),
                .footer(for: context.site)
            )
        )
    }

    func makeTagListHTML(for page: TagListPage,
                         context: PublishingContext<Site>) throws -> HTML? {
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: page, on: context.site),
//            .head(for: page, on: context.site),
            .body(
                .header(for: context, selectedSection: nil),
                .wrapper(
                    .h1("Browse all tags"),
                    .ul(
                        .class("all-tags"),
                        .forEach(page.tags.sorted()) { tag in
                            .li(
                                .class("tag"),
                                .a(
                                    .href(context.site.path(for: tag)),
                                    .text(tag.string)
                                )
                            )
                        }
                    )
                ),
                .footer(for: context.site)
            )
        )
    }

    func makeTagDetailsHTML(for page: TagDetailsPage,
                            context: PublishingContext<Site>) throws -> HTML? {
        HTML(
            .lang(context.site.language),
            .bootstrapHead(for: page, on: context.site),
//            .head(for: page, on: context.site),
            .body(
                .header(for: context, selectedSection: nil),
                .wrapper(
                    .h1(
                        "Tagged with ",
                        .span(.class("tag"), .text(page.tag.string))
                    ),
                    .a(
                        .class("browse-all"),
                        .text("Browse all tags"),
                        .href(context.site.tagListPath)
                    ),
                    .itemList(
                        for: context.items(
                            taggedWith: page.tag,
                            sortedBy: \.date,
                            order: .descending
                        ),
                        on: context.site
                    )
                ),
                .footer(for: context.site)
            )
        )
    }
}

private extension Node where Context == HTML.DocumentContext {
    
    static func bootstrapHead<T: Website>(
        for location: Location,
        on site: T
    ) -> Node {
        .head(
            for: location,
            on: site,
            titleSeparator: " | ",
            stylesheetPaths: [
                "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
//                "MuriloWebsite/styles.css",
//                "/styles.css",
            ],
            rssFeedPath: nil,
            rssFeedTitle: nil
        )
    }
    
}

private extension Node where Context == HTML.BodyContext {
    static func wrapper(_ nodes: Node...) -> Node {
//        .div(.class("wrapper"), .group(nodes))
        .div(.class("container p-4 text-left"), .group(nodes))
    }
    
    static func header<T: Website> (
        for context: PublishingContext<T>,
        selectedSection: T.SectionID?
    ) -> Node {
        let sectionIDs = T.SectionID.allCases
//        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
//          <span class="navbar-toggler-icon"></span>
//        </button>
        
        return .header(
            .nav(.class("navbar navbar-expand-lg navbar-dark bg-dark"),
                 .div(.class("container"),
                      .a(.class("navbar-brand h1"), .href("/"), .text(context.site.name)),
                      .button(
                        .class("navbar-toggler"),
                        .data(named: "toggle", value: "collapse"),
                        .data(named: "target", value: "#conteudoNavbarSuportado"),
                        .ariaControls("conteudoNavbarSuportado"),
                        .ariaExpanded(false),
                        .ariaLabel("Alterna navegação"),
                        .span(.class("navbar-toggler-icon"))
                    ),
                      .div(.class("collapse navbar-collapse"), .id("conteudoNavbarSuportado"),
                           .ul(.class("navbar-nav ml-auto"),
//                               .if(selectedSection == MuriloWebsite().SectionID.posts,
//                                   .li(.class("nav-item \(section == selectedSection ? "active" : "")"),
//                                       .a(.class("nav-link"),
//                                          .href(context.sections[section].path),
//                                          .text(context.sections[section].title)
//                                    )
//                                ),
//                                   else:
//                                .forEach(sectionIDs) { section in
//                                    .li(.class("nav-item \(section == selectedSection ? "active" : "")"),
//                                        .a(.class("nav-link"),
//                                           .href(context.sections[section].path),
//                                           .text(context.sections[section].title)
//                                        )
//                                    )
//                                }
//                            )
                            .forEach(sectionIDs) { section in
                                .li(.class("nav-item \(section == selectedSection ? "active" : "")"),
                                    .a(.class("nav-link"),
                                       .href(context.sections[section].path),
                                       .text(context.sections[section].title)
                                    )
                                )
                            }
                        )
                    )
                )
            )
        )
    }

//    static func header<T: Website>(
//        for context: PublishingContext<T>,
//        selectedSection: T.SectionID?
//    ) -> Node {
//        let sectionIDs = T.SectionID.allCases
//
//        return .header(
//            .wrapper(
//                .a(.class("site-name"), .href("/"), .text(context.site.name)),
//                .if(sectionIDs.count > 1,
//                    .nav(
//                        .ul(.forEach(sectionIDs) { section in
//                            .li(.a(
//                                .class(section == selectedSection ? "selected" : ""),
//                                .href(context.sections[section].path),
//                                .text(context.sections[section].title)
//                            ))
//                        })
//                    )
//                )
//            )
//        )
//    }

    static func itemList<T: Website>(for items: [Item<T>], on site: T) -> Node {
        return .ul(
            .class("item-list"),
            .forEach(items) { item in
                .li(.article(
                    .h1(.a(
                        .href(item.path),
                        .text(item.title)
                    )),
                    .tagList(for: item, on: site),
                    .p(.text(item.description))
                ))
            }
        )
    }

    static func tagList<T: Website>(for item: Item<T>, on site: T) -> Node {
        return .ul(.class("tag-list"), .forEach(item.tags) { tag in
            .li(.a(
                .href(site.path(for: tag)),
                .text(tag.string)
                ))
            })
    }
    
    static func footer<T: Website>(for site: T) -> Node {
        return .footer(
            .class("container text-center"),
            .p(
                .text("Gerado com "),
                .a(
                    .text("Publish"),
                    .href("https://github.com/johnsundell/publish")
                ),
                .text("."),
                .br(),
                .text("Copyright © 2020 Murilo Teixeira.")
            ),
            
            .script(.src("https://code.jquery.com/jquery-3.3.1.slim.min.js")),
            .script(.src("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js")),
            .script(.src("https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"))
        )
    }
}
