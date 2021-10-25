// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getInput, setOutput, setFailed } from '@actions/core';
import { Logger } from '@dolittle/github-actions.shared.logging';
import { MarkdownRenderer } from './MarkdownRenderer';
import { PlaintextRenderer } from './PlaintextRenderer';
import { ReleaseNotesCreator } from './ReleaseNotesCreator';
import { ReleaseParser } from './ReleaseParser';

const logger = new Logger();

run();
export async function run() {
    try {
        const body = getInput('body', { required: true });
        const version = getInput('version', { required: true });
        const changelogURL = getInput('changelog-url');

        logger.info('Inputs:');
        logger.info(` body: '${body}'`);
        logger.info(` version: '${version}'`);
        logger.info(` changelog-url: '${changelogURL}'`);

        const parser = new ReleaseParser(logger);
        const information = parser.parse(version, body, changelogURL);

        const creator = new ReleaseNotesCreator(logger);
        const releaseNotes = creator.createFrom(information);

        const markdownRenderer = new MarkdownRenderer(logger);
        const markdown = markdownRenderer.render(releaseNotes);
        const plaintextRenderer = new PlaintextRenderer(logger);
        const plaintext = plaintextRenderer.render(releaseNotes);

        output(markdown, plaintext);
    } catch (error) {
        fail(error as Error);
    }
}

function output(
    markdown: string,
    plaintext: string) {
    logger.info('Outputting: ');
    logger.info(` markdown: '${markdown}'`);
    logger.info(` plaintext: '${plaintext}'`);

    setOutput('markdown', markdown);
    setOutput('plaintext', plaintext);
}

function fail(error: Error) {
    logger.error(error.message);
    setFailed(error.message);
}
