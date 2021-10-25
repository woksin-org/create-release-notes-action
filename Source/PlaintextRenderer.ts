// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/github-actions.shared.logging';
import { Parser, Renderer, Slugger } from 'marked';
import { decode } from 'he';

import { IRenderReleaseNotes } from './IRenderReleaseNotes';
import { ReleaseNotes } from './ReleaseNotes';

class Plaintext extends Renderer {
    code(code: string, language: string | undefined, isEscaped: boolean): string {
        return decode(code);
    }

    blockquote(quote: string): string {
        return decode(quote);
    }

    html(html: string): string {
        return decode(html);
    }

    heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string, slugger: Slugger): string {
        return decode(text) + ':\n';
    }

    hr(): string {
        return '';
    }

    list(body: string, ordered: boolean, start: number): string {
        return decode(body) + '\n';
    }

    listitem(text: string, task: boolean, checked: boolean): string {
        return '- ' + decode(text) + '\n';
    }

    checkbox(checked: boolean): string {
        return checked ? 'x' : '-';
    }

    paragraph(text: string): string {
        return decode(text) + '\n\n';
    }

    table(header: string, body: string): string {
        return decode(body);
    }

    tablerow(content: string): string {
        return decode(content);
    }

    tablecell(content: string, flags: { header: boolean; align: 'center' | 'left' | 'right' | null; }): string {
        return decode(content);
    }

    strong(text: string): string {
        return decode(text);
    }

    em(text: string): string {
        return decode(text);
    }

    codespan(text: string): string {
        return decode(text);
    }

    del(text: string): string {
        return decode(text);
    }

    text(text: string): string {
        return decode(text);
    }

    link(href: string | null, title: string | null, text: string): string {
        return decode(text) + ' (' + href + ')';
    }

    image(href: string | null, title: string | null, text: string): string {
        return decode(text);
    }

    br(): string {
        return '';
    }
}

/**
 * Represents an implementation of {IRenderReleaseNotes} that renders to plain text.
 */
export class PlaintextRenderer implements IRenderReleaseNotes {
    private readonly _parser: Parser;
    private readonly _logger: ILogger;

    constructor(private logger: ILogger) {
        this._parser = new Parser({
            renderer: new Plaintext(),
        });
        this._logger = logger;
    }

    /** @inheritdoc */
    render(releaseNotes: ReleaseNotes): string {
        this._logger.debug('Rendering release notes as plain text');
        return this._parser.parse(releaseNotes);
    }
}
