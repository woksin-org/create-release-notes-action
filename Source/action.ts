// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getInput, setOutput, setFailed } from '@actions/core';
import { Logger } from '@woksin/github-actions.shared.logging';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MSbuildOutputFormatter } from './MSbuildOutputFormatter';
import { OutputFormatters } from './OutputFormatters';
import { PlaintextRenderer } from './PlaintextRenderer';
import { RawOutputFormatter } from './RawOutputFormatter';
import { ReleaseNotesCreator } from './ReleaseNotesCreator';
import { ReleaseParser } from './ReleaseParser';

const logger = new Logger();

run();
/**
 * Runs the action.
 */
export async function run() {
    try {
        let body = getInput('body', { required: true });
        if (!body) {
            body = 'No release notes were given';
        }
        const version = getInput('version', { required: true });
        const changelogURL = getInput('changelog-url');
        let outputFormat = getInput('output-format');

        logger.info('Inputs:');
        logger.info(` body: '${body}'`);
        logger.info(` version: '${version}'`);
        logger.info(` changelog-url: '${changelogURL}'`);
        logger.info(` output-format: '${outputFormat}'`);

        const parser = new ReleaseParser(logger);
        const information = parser.parse(version, body, changelogURL);

        const creator = new ReleaseNotesCreator(logger);
        const releaseNotes = creator.createFrom(information);

        const formatters = new OutputFormatters(new RawOutputFormatter(), new MSbuildOutputFormatter());
        if (outputFormat === undefined || outputFormat === null || outputFormat.trim() === '') {
            logger.debug('Output format not provided, defaulting to "raw"');
            outputFormat = 'raw';
        }

        const markdownRenderer = new MarkdownRenderer(logger);
        const markdown = formatters.format(outputFormat, markdownRenderer.render(releaseNotes));
        const plaintextRenderer = new PlaintextRenderer(logger);
        const plaintext = formatters.format(outputFormat, plaintextRenderer.render(releaseNotes));

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
