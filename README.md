# musicgpt
Next.js application that talks to a trained openai model for music

# Initial setup to train the model

pip install --upgrade openai
export OPENAI_API_KEY="<OPEN_API_KEY>"

# Prepare the file for tuning

`openai tools fine_tunes.prepare_data -f music.jsonl`

Answer the prompts:

```
Analyzing...

- Your file contains 296 prompt-completion pairs
- Your data does not contain a common separator at the end of your prompts. Having a separator string appended to the end of the prompt makes it clearer to the fine-tuned model where the completion should begin. See https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset for more detail and examples. If you intend to do open-ended generation, then you should leave the prompts empty
- Your data does not contain a common ending at the end of your completions. Having a common ending string appended to the end of the completion makes it clearer to the fine-tuned model where the completion should end. See https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset for more detail and examples.
- The completion should start with a whitespace character (` `). This tends to produce better results due to the tokenization we use. See https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset for more details

Based on the analysis we will perform the following actions:
- [Recommended] Add a suffix separator ` ->` to all prompts [Y/n]: Y
- [Recommended] Add a suffix ending `\n` to all completions [Y/n]: Y
- [Recommended] Add a whitespace character to the beginning of the completion [Y/n]: Y


Your data will be written to a new JSONL file. Proceed [Y/n]: Y

Wrote modified file to `music_prepared (1).jsonl`
Feel free to take a look!

Now use that file when fine-tuning:
> openai api fine_tunes.create -t "music_prepared.jsonl"

After you’ve fine-tuned a model, remember that your prompt has to end with the indicator string ` ->` for the model to start generating completions, rather than continuing with the prompt. Make sure to include `stop=["\n"]` so that the generated texts ends at the expected place.
Once your model starts training, it'll approximately take 6.51 minutes to train a `curie` model, and less for `ada` and `babbage`. Queue will approximately take half an hour per job ahead of you.
```

# Tune and follow

`openai api fine_tunes.create -t music_prepared.jsonl -m davinci`

```
[2023-03-29 22:21:05] Created fine-tune: ft-OlNxYMfS7syiEapWcA8FzhVa
[2023-03-29 22:23:02] Fine-tune costs $0.70
[2023-03-29 22:23:02] Fine-tune enqueued. Queue number: 25
[2023-03-29 22:23:27] Fine-tune is in the queue. Queue number: 24
[2023-03-29 22:23:30] Fine-tune is in the queue. Queue number: 23
[2023-03-29 22:24:05] Fine-tune is in the queue. Queue number: 22
[2023-03-29 22:25:19] Fine-tune is in the queue. Queue number: 21
[2023-03-29 22:25:21] Fine-tune is in the queue. Queue number: 20
[2023-03-29 22:25:22] Fine-tune is in the queue. Queue number: 19
[2023-03-29 22:26:33] Fine-tune is in the queue. Queue number: 18
[2023-03-29 22:26:48] Fine-tune is in the queue. Queue number: 17
[2023-03-29 22:28:00] Fine-tune is in the queue. Queue number: 16
[2023-03-29 22:28:19] Fine-tune is in the queue. Queue number: 15
[2023-03-29 22:28:48] Fine-tune is in the queue. Queue number: 14
[2023-03-29 22:29:10] Fine-tune is in the queue. Queue number: 13
[2023-03-29 22:29:16] Fine-tune is in the queue. Queue number: 12
[2023-03-29 22:29:39] Fine-tune is in the queue. Queue number: 11

Stream interrupted (client disconnected).
To resume the stream, run:

  openai api fine_tunes.follow -i ft-OlNxYMfS7syiEapWcA9FzhVn
```

We can follow the tune process given the command above:

`openai api fine_tunes.follow -i ft-OlNxYMfS7syiEapWcA9FzhVn`

Or we can check the status with a single get command:

`openai api fine_tunes.get -i ft-OlNxYMfS7syiEapWcA9FzhVn`

Once it is done, we should use the fine tuned model name to process prompts.

More information at [Fine tuning - OpenAI](https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset)

