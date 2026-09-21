const CHESS_EVALUATION_RESULTS = {
  "created_utc": "2026-09-21T15:18:25.247987+00:00",
  "model": {
    "version": "3.5",
    "backend": "cloud",
    "device": "api",
    "context_size": 1000,
    "n_estimators": 8,
    "random_state": 42,
    "fit_mode": "fit_with_cache",
    "extra_features": true,
    "search": false
  },
  "sampling": {
    "seed": 20260921,
    "per_phase": 100,
    "phase_source": "dataset phase column",
    "excluded_reference_rows": 10000,
    "eligible_unique_positions": 89993,
    "position_identity": "first four FEN fields; clocks ignored",
    "limitation": "Position-disjoint evaluation; source-game overlap is unknown."
  },
  "targets": {
    "score": "1 / (1 + 10 ** (-cp / 400)); not a calibrated win probability",
    "cp_range": [
      -1000,
      1000
    ],
    "cp_prediction": "inverse score transform, clipped to the target CP range",
    "provenance": "Existing dataset labels; Stockfish version and analysis depth not recorded here."
  },
  "sources": {
    "reference_sha256": "5d2bb5a02057637a18b73c69dccdc6cb2de5dfe9410cf434b8170eff4a2b1fae",
    "evaluation_sha256": "d4fd12bcef2d967a318e7b1376115896831c9c853d195c261f5d737b3a727cbb",
    "script_sha256": "0ceb0283ad880d13606b445123a01773d6557c241756fd25b166ee77352e6476",
    "encoder_sha256": "bf2ead1b2119f75fd98eeab1149101492394a14c206f90e482a6331fb289838e"
  },
  "versions": {
    "tabpfn": "9.0.0",
    "tabpfn-client": "0.6.0",
    "numpy": "2.5.3",
    "pandas": "2.3.3",
    "scipy": "1.18.1"
  },
  "metrics": {
    "n": 300,
    "pearson_r": 0.5653674496207778,
    "spearman_rho": 0.5287167833300104,
    "r2": 0.3064747429533481,
    "mae_score": 0.1599825437886951,
    "mae_cp": 204.0472837176844
  },
  "phases": [
    {
      "phase": "opening",
      "n": 100,
      "mae_cp": 106.19960611342056,
      "mae_score": 0.11918887358158826
    },
    {
      "phase": "middlegame",
      "n": 100,
      "mae_cp": 176.95106989457142,
      "mae_score": 0.16867091868305578
    },
    {
      "phase": "endgame",
      "n": 100,
      "mae_cp": 328.9911751450612,
      "mae_score": 0.1920878391014412
    }
  ],
  "points": [
    {
      "source_row": 35707,
      "fen": "rnbqkbnr/ppp2ppp/4p3/3p4/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5558909773826599,
      "target_cp": 39.0,
      "prediction_raw": 0.4687061905860901,
      "prediction_score": 0.4687061905860901,
      "prediction_cp": -21.77362637587357
    },
    {
      "source_row": 44691,
      "fen": "rnbqkbnr/1ppppppp/8/p7/3P4/6P1/PPP1PP1P/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5416377186775208,
      "target_cp": 29.0,
      "prediction_raw": 0.4849356412887573,
      "prediction_score": 0.4849356412887573,
      "prediction_cp": -10.470957647038293
    },
    {
      "source_row": 58207,
      "fen": "rnbq1bnr/pppk1ppp/4p3/3p4/3PP3/1P6/P1P2PPP/RNBQKBNR w KQ - 1 4",
      "phase": "opening",
      "target_score": 0.6887735724449158,
      "target_cp": 138.0,
      "prediction_raw": 0.4753340482711792,
      "prediction_score": 0.4753340482711792,
      "prediction_cp": -17.15358300119111
    },
    {
      "source_row": 53354,
      "fen": "rnbqkbnr/ppppp1pp/8/5p2/8/P2P4/1PP1PPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5129491686820984,
      "target_cp": 9.0,
      "prediction_raw": 0.4435522258281708,
      "prediction_score": 0.4435522258281708,
      "prediction_cp": -39.39185863475104
    },
    {
      "source_row": 46684,
      "fen": "r1bqkbnr/pppppppp/n7/8/1P6/3P4/P1P1PPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.3572869300842285,
      "target_cp": -102.0,
      "prediction_raw": 0.45082104206085205,
      "prediction_score": 0.45082104206085205,
      "prediction_cp": -34.283884058565576
    },
    {
      "source_row": 83944,
      "fen": "r1bqkbnr/p1pppppp/2n5/1p6/1P6/2N2N2/P1PPPPPP/R1BQKB1R b KQkq - 2 3",
      "phase": "opening",
      "target_score": 0.5100724697113037,
      "target_cp": 7.0,
      "prediction_raw": 0.4350144565105438,
      "prediction_score": 0.4350144565105438,
      "prediction_cp": -45.41345828671272
    },
    {
      "source_row": 42766,
      "fen": "r1bqkb1r/1ppp1ppp/p1n5/4p2n/1PP5/2N5/P2PPPPP/R1BQKBNR w KQkq - 1 6",
      "phase": "opening",
      "target_score": 0.5057561993598938,
      "target_cp": 4.0,
      "prediction_raw": 0.4797402322292328,
      "prediction_score": 0.4797402322292328,
      "prediction_cp": -14.085640689391306
    },
    {
      "source_row": 97952,
      "fen": "r1bqkbnr/pppp1p1p/2n3p1/8/3NP3/8/PPPQ1PPP/RNB1KB1R b KQkq - 1 5",
      "phase": "opening",
      "target_score": 0.47411906719207764,
      "target_cp": -18.0,
      "prediction_raw": 0.3738129138946533,
      "prediction_score": 0.3738129138946533,
      "prediction_cp": -89.61992250951378
    },
    {
      "source_row": 56167,
      "fen": "rnbqkbnr/ppppppp1/8/7p/8/3P1N2/PPP1PPPP/RNBQKB1R b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5473484992980957,
      "target_cp": 33.0,
      "prediction_raw": 0.43310362100601196,
      "prediction_score": 0.43310362100601196,
      "prediction_cp": -46.76474730826264
    },
    {
      "source_row": 22062,
      "fen": "rnbqkbnr/ppppppp1/7p/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.6035363078117371,
      "target_cp": 73.0,
      "prediction_raw": 0.4819965362548828,
      "prediction_score": 0.4819965362548828,
      "prediction_cp": -12.515498583115036
    },
    {
      "source_row": 79653,
      "fen": "rnbqkbnr/ppp1pppp/3p4/8/8/3P1N2/PPP1PPPP/RNBQKB1R b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5043172240257263,
      "target_cp": 3.0,
      "prediction_raw": 0.45542967319488525,
      "prediction_score": 0.45542967319488525,
      "prediction_cp": -31.053059978971465
    },
    {
      "source_row": 75400,
      "fen": "rnbqkb1r/1pp1pppp/5n2/p2p4/3P4/1P3N2/P1P1PPPP/RNBQKB1R w KQkq - 0 4",
      "phase": "opening",
      "target_score": 0.5172625184059143,
      "target_cp": 12.0,
      "prediction_raw": 0.4905250668525696,
      "prediction_score": 0.4905250668525696,
      "prediction_cp": -6.584646143727675
    },
    {
      "source_row": 12716,
      "fen": "rnbq1bnr/pppppkpp/5p2/8/4P3/8/PPPPQPPP/RNB1KBNR w KQ - 2 3",
      "phase": "opening",
      "target_score": 0.7501634955406189,
      "target_cp": 191.0,
      "prediction_raw": 0.4943193197250366,
      "prediction_score": 0.4943193197250366,
      "prediction_cp": -3.947510809751557
    },
    {
      "source_row": 34247,
      "fen": "rnbqkbnr/1ppppppp/8/p7/8/5P2/PPPPP1PP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5444945693016052,
      "target_cp": 31.0,
      "prediction_raw": 0.4828253388404846,
      "prediction_score": 0.4828253388404846,
      "prediction_cp": -11.938873853833213
    },
    {
      "source_row": 85608,
      "fen": "r1bqkbnr/pp1pp2p/2n2pp1/2p5/2P5/2NP2P1/PP2PP1P/R1BQKBNR w KQkq - 0 5",
      "phase": "opening",
      "target_score": 0.6172250509262085,
      "target_cp": 83.0,
      "prediction_raw": 0.490084707736969,
      "prediction_score": 0.490084707736969,
      "prediction_cp": -6.890754108611907
    },
    {
      "source_row": 62743,
      "fen": "rnbqkbnr/ppppp1pp/5p2/8/2P5/7N/PP1PPPPP/RNBQKB1R b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.560150146484375,
      "target_cp": 42.0,
      "prediction_raw": 0.45808351039886475,
      "prediction_score": 0.45808351039886475,
      "prediction_cp": -29.195082908304904
    },
    {
      "source_row": 26595,
      "fen": "rnbqkbnr/pppppp2/6pp/8/8/P6N/1PPPPPPP/RNBQKB1R w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.45836231112480164,
      "target_cp": -29.0,
      "prediction_raw": 0.47234681248664856,
      "prediction_score": 0.47234681248664856,
      "prediction_cp": -19.235030819438155
    },
    {
      "source_row": 93515,
      "fen": "rnbqkbnr/ppp2ppp/8/P2pp3/8/8/1PPPPPPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.42010024189949036,
      "target_cp": -56.0,
      "prediction_raw": 0.447521448135376,
      "prediction_score": 0.447521448135376,
      "prediction_cp": -36.600627314824024
    },
    {
      "source_row": 97031,
      "fen": "r1bqkb1r/pppppppp/n4n2/8/7P/2P5/PP1PPPP1/RNBQKBNR w KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.5258809328079224,
      "target_cp": 18.0,
      "prediction_raw": 0.48054903745651245,
      "prediction_score": 0.48054903745651245,
      "prediction_cp": -13.522737464649992
    },
    {
      "source_row": 81831,
      "fen": "rnbqkb1r/pp2pp1p/3p2p1/8/1P1Nn3/2N5/P1P2PPP/R1BQKB1R w KQkq - 0 7",
      "phase": "opening",
      "target_score": 0.9320864677429199,
      "target_cp": 455.0,
      "prediction_raw": 0.3690434992313385,
      "prediction_score": 0.3690434992313385,
      "prediction_cp": -93.1687438840978
    },
    {
      "source_row": 36498,
      "fen": "r1bqkbnr/pppppppp/n7/8/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.5924662351608276,
      "target_cp": 65.0,
      "prediction_raw": 0.5015875697135925,
      "prediction_score": 0.5015875697135925,
      "prediction_cp": 1.1031601331833558
    },
    {
      "source_row": 14908,
      "fen": "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
      "phase": "opening",
      "target_score": 0.5686413645744324,
      "target_cp": 48.0,
      "prediction_raw": 0.42220520973205566,
      "prediction_score": 0.42220520973205566,
      "prediction_cp": -54.50001350608551
    },
    {
      "source_row": 36020,
      "fen": "rnbqkbnr/p1pppppp/8/1p6/8/1P6/P1PPPPPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5473484992980957,
      "target_cp": 33.0,
      "prediction_raw": 0.5065455436706543,
      "prediction_score": 0.5065455436706543,
      "prediction_cp": 4.5485694468375915
    },
    {
      "source_row": 51465,
      "fen": "r1bqkbnr/pp2pppp/n7/3p4/2PP4/8/PP3PPP/RNBQKBNR w KQkq - 1 5",
      "phase": "opening",
      "target_score": 0.6360769271850586,
      "target_cp": 97.0,
      "prediction_raw": 0.4527055025100708,
      "prediction_score": 0.4527055025100708,
      "prediction_cp": -32.96212340092276
    },
    {
      "source_row": 32687,
      "fen": "rnbqkb1r/pp1p1ppp/2p2n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR w KQkq - 0 4",
      "phase": "opening",
      "target_score": 0.934240460395813,
      "target_cp": 461.0,
      "prediction_raw": 0.4466979503631592,
      "prediction_score": 0.4466979503631592,
      "prediction_cp": -37.17932770150343
    },
    {
      "source_row": 27464,
      "fen": "r1bqkbnr/pppppppp/2n5/8/8/2N5/PPPPPPPP/R1BQKBNR w KQkq - 2 2",
      "phase": "opening",
      "target_score": 0.5344839692115784,
      "target_cp": 24.0,
      "prediction_raw": 0.4873791038990021,
      "prediction_score": 0.4873791038990021,
      "prediction_cp": -8.77176014000102
    },
    {
      "source_row": 47888,
      "fen": "rnbqkbnr/1ppppppp/p7/8/7N/8/PPPPPPPP/RNBQKB1R b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.38141587376594543,
      "target_cp": -84.0,
      "prediction_raw": 0.42990943789482117,
      "prediction_score": 0.42990943789482117,
      "prediction_cp": -49.02674876059358
    },
    {
      "source_row": 89505,
      "fen": "rnbqkb1r/pppppppp/5n2/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.5172625184059143,
      "target_cp": 12.0,
      "prediction_raw": 0.4816763997077942,
      "prediction_score": 0.4816763997077942,
      "prediction_cp": -12.738246198268314
    },
    {
      "source_row": 30602,
      "fen": "rnbqkbnr/p2ppppp/2p5/1p6/P7/6P1/1PPPPP1P/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.7129021286964417,
      "target_cp": 158.0,
      "prediction_raw": 0.4877816438674927,
      "prediction_score": 0.4877816438674927,
      "prediction_cp": -8.491874019044321
    },
    {
      "source_row": 12438,
      "fen": "rnbqkbnr/1ppppppp/8/p7/2N5/8/PPPPPPPP/R1BQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.3572869300842285,
      "target_cp": -102.0,
      "prediction_raw": 0.4515989422798157,
      "prediction_score": 0.4515989422798157,
      "prediction_cp": -33.73814707730911
    },
    {
      "source_row": 83091,
      "fen": "rnbqkb1r/pppppppp/7n/8/1P6/5P2/P1PPP1PP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.32118308544158936,
      "target_cp": -130.0,
      "prediction_raw": 0.42804089188575745,
      "prediction_score": 0.42804089188575745,
      "prediction_cp": -50.35188798682567
    },
    {
      "source_row": 54599,
      "fen": "rnbqk2r/ppppbppp/5n2/4p3/8/3P3P/PPPNPPP1/R1BQKBNR w KQkq - 3 4",
      "phase": "opening",
      "target_score": 0.46838170289993286,
      "target_cp": -22.0,
      "prediction_raw": 0.473538875579834,
      "prediction_score": 0.473538875579834,
      "prediction_cp": -18.404267370364348
    },
    {
      "source_row": 93267,
      "fen": "rnbqkbnr/p1pp1ppp/1p6/8/3pP3/P7/1PPK1PPP/RNBQ1BNR b kq - 0 4",
      "phase": "opening",
      "target_score": 0.23194800317287445,
      "target_cp": -208.0,
      "prediction_raw": 0.2752304673194885,
      "prediction_score": 0.2752304673194885,
      "prediction_cp": -168.20136839042422
    },
    {
      "source_row": 74035,
      "fen": "rnbqkbnr/ppp1pppp/8/1N1p4/8/8/PPPPPPPP/R1BQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.3338605761528015,
      "target_cp": -120.0,
      "prediction_raw": 0.39411482214927673,
      "prediction_score": 0.39411482214927673,
      "prediction_cp": -74.707023912381
    },
    {
      "source_row": 50006,
      "fen": "rnbqkbnr/ppppppp1/8/7p/8/2P5/PP1PPPPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5770924687385559,
      "target_cp": 54.0,
      "prediction_raw": 0.4870287775993347,
      "prediction_score": 0.4870287775993347,
      "prediction_cp": -9.015351337735598
    },
    {
      "source_row": 26194,
      "fen": "rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.5301846861839294,
      "target_cp": 21.0,
      "prediction_raw": 0.4351959824562073,
      "prediction_score": 0.4351959824562073,
      "prediction_cp": -45.28515991025918
    },
    {
      "source_row": 64393,
      "fen": "r1bqkbnr/1ppp1pp1/p1n5/1B2p2p/4P3/5N2/PPPP1PPP/RNBQKR2 w Qkq - 0 5",
      "phase": "opening",
      "target_score": 0.465516060590744,
      "target_cp": -24.0,
      "prediction_raw": 0.4328536093235016,
      "prediction_score": 0.4328536093235016,
      "prediction_cp": -46.94165174697098
    },
    {
      "source_row": 98781,
      "fen": "rnbqkb1r/p1pppppp/1p3n2/8/5P2/3P4/PPP1P1PP/RNBQKBNR w KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.5344839692115784,
      "target_cp": 24.0,
      "prediction_raw": 0.47866499423980713,
      "prediction_score": 0.47866499423980713,
      "prediction_cp": -14.834087767831312
    },
    {
      "source_row": 27437,
      "fen": "rnbqkbnr/pp1ppppp/8/2p5/8/P1N5/1PPPPPPP/R1BQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.45979177951812744,
      "target_cp": -28.0,
      "prediction_raw": 0.4441395401954651,
      "prediction_score": 0.4441395401954651,
      "prediction_cp": -38.978537485343594
    },
    {
      "source_row": 64351,
      "fen": "rnbqkbnr/pp1ppp1p/8/2p3p1/5P2/7N/PPPPP1PP/RNBQKB1R w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.693687915802002,
      "target_cp": 142.0,
      "prediction_raw": 0.48861145973205566,
      "prediction_score": 0.48861145973205566,
      "prediction_cp": -7.91493724623185
    },
    {
      "source_row": 72608,
      "fen": "rn2kbnr/pppbppp1/7p/3q4/8/P1N5/1PPP1PPP/R1BQKBNR w KQkq - 1 5",
      "phase": "opening",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.39841580390930176,
      "prediction_score": 0.39841580390930176,
      "prediction_cp": -71.58394456345557
    },
    {
      "source_row": 83499,
      "fen": "rnbqkbnr/ppppp1pp/5p2/8/7P/N7/PPPPPPP1/R1BQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.46408405900001526,
      "target_cp": -25.0,
      "prediction_raw": 0.4360598027706146,
      "prediction_score": 0.4360598027706146,
      "prediction_cp": -44.67479914055005
    },
    {
      "source_row": 53326,
      "fen": "rnbqkbnr/ppppp2p/5p2/6p1/8/3P2P1/PPP1PP1P/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.7811154127120972,
      "target_cp": 221.0,
      "prediction_raw": 0.5123354196548462,
      "prediction_score": 0.5123354196548462,
      "prediction_cp": 8.573267157209877
    },
    {
      "source_row": 94614,
      "fen": "rnbqkbnr/ppppp1pp/5p2/8/8/4PQ2/PPPP1PPP/RNB1KBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.5186997652053833,
      "target_cp": 13.0,
      "prediction_raw": 0.45213955640792847,
      "prediction_score": 0.45213955640792847,
      "prediction_cp": -33.358976365999716
    },
    {
      "source_row": 63742,
      "fen": "rnbqkbnr/p1pppppp/8/1p6/8/5P2/PPPPP1PP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5459219217300415,
      "target_cp": 32.0,
      "prediction_raw": 0.4858306348323822,
      "prediction_score": 0.4858306348323822,
      "prediction_cp": -9.84852032700068
    },
    {
      "source_row": 37517,
      "fen": "rnbqkbnr/pppppp1p/8/8/2P3p1/7N/PP1PPPPP/RNBQKB1R w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5501993298530579,
      "target_cp": 35.0,
      "prediction_raw": 0.5289499163627625,
      "prediction_score": 0.5289499163627625,
      "prediction_cp": 20.138987022294923
    },
    {
      "source_row": 64685,
      "fen": "rnbqkb1r/ppp1pppp/8/3p4/2PPn3/8/PP1NPPPP/RNBQKB1R b KQkq - 2 4",
      "phase": "opening",
      "target_score": 0.5172625184059143,
      "target_cp": 12.0,
      "prediction_raw": 0.40985751152038574,
      "prediction_score": 0.40985751152038574,
      "prediction_cp": -63.32959391269789
    },
    {
      "source_row": 79714,
      "fen": "rnbqkbnr/1pp1pppp/p7/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.6571186780929565,
      "target_cp": 113.0,
      "prediction_raw": 0.47273343801498413,
      "prediction_score": 0.47273343801498413,
      "prediction_cp": -18.965563109401344
    },
    {
      "source_row": 50281,
      "fen": "rnbqkbnr/ppppppp1/7p/8/5PP1/8/PPPPP2P/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.24448111653327942,
      "target_cp": -196.0,
      "prediction_raw": 0.3961474299430847,
      "prediction_score": 0.3961474299430847,
      "prediction_cp": -73.22963052407954
    },
    {
      "source_row": 73608,
      "fen": "r1bqkbnr/ppp1pppp/n7/3p4/8/2N2P1P/PPPPP1P1/R1BQKBNR b KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.22686009109020233,
      "target_cp": -213.0,
      "prediction_raw": 0.437226265668869,
      "prediction_score": 0.437226265668869,
      "prediction_cp": -43.85103052724542
    },
    {
      "source_row": 86698,
      "fen": "rnbqkbnr/pppp1p1p/8/4p1p1/8/P2P4/1PP1PPPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.6293885707855225,
      "target_cp": 92.0,
      "prediction_raw": 0.49372056126594543,
      "prediction_score": 0.49372056126594543,
      "prediction_cp": -4.363630374742768
    },
    {
      "source_row": 28954,
      "fen": "rnbqkbnr/ppppppp1/8/3P3p/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5714631080627441,
      "target_cp": 50.0,
      "prediction_raw": 0.41705936193466187,
      "prediction_score": 0.41705936193466187,
      "prediction_cp": -58.170583012666896
    },
    {
      "source_row": 47760,
      "fen": "rnbqk1nr/ppppppb1/6pp/3P4/4P3/1P6/P1P2PPP/RNBQKBNR b KQkq - 0 4",
      "phase": "opening",
      "target_score": 0.043710846453905106,
      "target_cp": -536.0,
      "prediction_raw": 0.39964061975479126,
      "prediction_score": 0.39964061975479126,
      "prediction_cp": -70.69667072444071
    },
    {
      "source_row": 11554,
      "fen": "rnbqkbnr/ppppp1pp/5p2/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.4526514708995819,
      "target_cp": -33.0,
      "prediction_raw": 0.4435589611530304,
      "prediction_score": 0.4435589611530304,
      "prediction_cp": -39.387118038063626
    },
    {
      "source_row": 30721,
      "fen": "rnbqkbnr/pp1p1ppp/8/2P1p3/8/8/PPP1PPPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5714631080627441,
      "target_cp": 50.0,
      "prediction_raw": 0.4911940097808838,
      "prediction_score": 0.4911940097808838,
      "prediction_cp": -6.119661524102993
    },
    {
      "source_row": 87375,
      "fen": "rn1qkbnr/ppp1pppp/8/3p1b2/8/2PP4/PP2PPPP/RNBQKBNR w KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.5186997652053833,
      "target_cp": 13.0,
      "prediction_raw": 0.4468429684638977,
      "prediction_score": 0.4468429684638977,
      "prediction_cp": -37.07740364329391
    },
    {
      "source_row": 31700,
      "fen": "rnbqkb1r/ppp2ppp/4pn2/1N1p4/3PP3/8/PPP2PPP/R1BQKBNR b KQkq - 3 4",
      "phase": "opening",
      "target_score": 0.2824082672595978,
      "target_cp": -162.0,
      "prediction_raw": 0.40545517206192017,
      "prediction_score": 0.40545517206192017,
      "prediction_cp": -66.49670428797282
    },
    {
      "source_row": 98844,
      "fen": "rnbqkbnr/pppp1ppp/4p3/8/8/2N3P1/PPPPPP1P/R1BQKBNR b KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.47699040174484253,
      "target_cp": -16.0,
      "prediction_raw": 0.4582350552082062,
      "prediction_score": 0.4582350552082062,
      "prediction_cp": -29.089036187429535
    },
    {
      "source_row": 87080,
      "fen": "rnbqkb1r/pppppppp/5n2/8/7P/8/PPPPPPP1/RNBQKBNR w KQkq - 1 2",
      "phase": "opening",
      "target_score": 0.4612219035625458,
      "target_cp": -27.0,
      "prediction_raw": 0.4765540361404419,
      "prediction_score": 0.4765540361404419,
      "prediction_cp": -16.303881323932348
    },
    {
      "source_row": 65400,
      "fen": "rnbqkbnr/p1pppppp/1p6/8/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5287505388259888,
      "target_cp": 20.0,
      "prediction_raw": 0.5071790218353271,
      "prediction_score": 0.5071790218353271,
      "prediction_cp": 4.988838150533536
    },
    {
      "source_row": 26848,
      "fen": "rn1qkbnr/ppp1pppp/8/3p4/8/P4P1b/1PPPP1PP/RNBQKBNR w KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.9877775311470032,
      "target_cp": 763.0,
      "prediction_raw": 0.4047032296657562,
      "prediction_score": 0.4047032296657562,
      "prediction_cp": -67.03874246382168
    },
    {
      "source_row": 92239,
      "fen": "rnbqkbnr/pp1p1ppp/8/2p1p3/3P4/4B3/PPP1PPPP/RN1QKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.6813218593597412,
      "target_cp": 132.0,
      "prediction_raw": 0.4975530505180359,
      "prediction_score": 0.4975530505180359,
      "prediction_cp": -1.7003282265345931
    },
    {
      "source_row": 94822,
      "fen": "rnbqkbnr/pppp1ppp/8/4p3/8/2N3P1/PPPPPP1P/R1BQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.4469531178474426,
      "target_cp": -37.0,
      "prediction_raw": 0.458375483751297,
      "prediction_score": 0.458375483751297,
      "prediction_cp": -28.990773138774678
    },
    {
      "source_row": 54786,
      "fen": "rnbqkbnr/ppp1pppp/3p4/8/8/3P4/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5201367139816284,
      "target_cp": 14.0,
      "prediction_raw": 0.5136788487434387,
      "prediction_score": 0.5136788487434387,
      "prediction_cp": 9.507410038591388
    },
    {
      "source_row": 71275,
      "fen": "rnb1kbnr/pp1p1ppp/4pq2/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R w KQkq - 1 4",
      "phase": "opening",
      "target_score": 0.696128785610199,
      "target_cp": 144.0,
      "prediction_raw": 0.4593530297279358,
      "prediction_score": 0.4593530297279358,
      "prediction_cp": -28.306875368722796
    },
    {
      "source_row": 33217,
      "fen": "rnbqkbnr/pp1ppp1p/6p1/2p5/1P6/P7/2PPPPPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5487743616104126,
      "target_cp": 34.0,
      "prediction_raw": 0.4790804982185364,
      "prediction_score": 0.4790804982185364,
      "prediction_cp": -14.54484959640726
    },
    {
      "source_row": 31013,
      "fen": "r1bqkbnr/ppp1pppp/n7/3p4/8/2N4P/PPPPPPP1/R1BQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5487743616104126,
      "target_cp": 34.0,
      "prediction_raw": 0.4988456070423126,
      "prediction_score": 0.4988456070423126,
      "prediction_cp": -0.8021558116517373
    },
    {
      "source_row": 42614,
      "fen": "rnbqkb1r/pppppppp/5n2/8/6P1/2P5/PP1PPP1P/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.30144137144088745,
      "target_cp": -146.0,
      "prediction_raw": 0.4078238606452942,
      "prediction_score": 0.4078238606452942,
      "prediction_cp": -64.79130910286469
    },
    {
      "source_row": 71001,
      "fen": "r1bqkbnr/pppppppp/n7/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R w KQkq - 5 4",
      "phase": "opening",
      "target_score": 0.7233878970146179,
      "target_cp": 167.0,
      "prediction_raw": 0.5219913721084595,
      "prediction_score": 0.5219913721084595,
      "prediction_cp": 15.291035658164724
    },
    {
      "source_row": 70169,
      "fen": "rnbqkbnr/pp1p1ppp/8/2p1p3/4P3/8/PPPPNPPP/RNBQKB1R w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5416377186775208,
      "target_cp": 29.0,
      "prediction_raw": 0.4910488724708557,
      "prediction_score": 0.4910488724708557,
      "prediction_cp": -6.220545067511593
    },
    {
      "source_row": 96472,
      "fen": "rnbq1bnr/ppppkppp/8/4p3/8/3P3P/PPP1PPP1/RNBQKBNR w KQ - 1 3",
      "phase": "opening",
      "target_score": 0.5980137586593628,
      "target_cp": 69.0,
      "prediction_raw": 0.5303077697753906,
      "prediction_score": 0.5303077697753906,
      "prediction_cp": 21.085845672298227
    },
    {
      "source_row": 28319,
      "fen": "rnbqkbnr/p1p1pppp/1p1p4/8/6P1/8/PPPPPPBP/RNBQK1NR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.9836750626564026,
      "target_cp": 712.0,
      "prediction_raw": 0.48730069398880005,
      "prediction_score": 0.48730069398880005,
      "prediction_cp": -8.82627987953054
    },
    {
      "source_row": 27010,
      "fen": "rnbqkbr1/p2ppppp/1p3n2/2pP4/Q1P5/7N/PP2PPPP/RNB1KB1R b KQq - 1 5",
      "phase": "opening",
      "target_score": 0.7670249342918396,
      "target_cp": 207.0,
      "prediction_raw": 0.4058634340763092,
      "prediction_score": 0.4058634340763092,
      "prediction_cp": -66.20254240555555
    },
    {
      "source_row": 44113,
      "fen": "r1bqkb1r/pppp1pp1/2n2n2/4p2p/2B1P3/5N2/PPPP1PPP/RNBQK1R1 w Qkq - 0 5",
      "phase": "opening",
      "target_score": 0.4540780782699585,
      "target_cp": -32.0,
      "prediction_raw": 0.4003163278102875,
      "prediction_score": 0.4003163278102875,
      "prediction_cp": -70.20756805945264
    },
    {
      "source_row": 37106,
      "fen": "rnbqkb1r/ppp1pppp/5n2/3p4/5P2/4PN2/PPPP2PP/RNBQKB1R b KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.46265268325805664,
      "target_cp": -26.0,
      "prediction_raw": 0.4024888873100281,
      "prediction_score": 0.4024888873100281,
      "prediction_cp": -68.636837121779
    },
    {
      "source_row": 96336,
      "fen": "rnbqkbnr/pp1pppp1/8/2p4p/7P/5P2/PPPPP1P1/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.38686317205429077,
      "target_cp": -80.0,
      "prediction_raw": 0.45117661356925964,
      "prediction_score": 0.45117661356925964,
      "prediction_cp": -34.03441160916946
    },
    {
      "source_row": 48802,
      "fen": "rnbqkbnr/pppppp2/6pp/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.6571186780929565,
      "target_cp": 113.0,
      "prediction_raw": 0.4802079498767853,
      "prediction_score": 0.4802079498767853,
      "prediction_cp": -13.760114964549722
    },
    {
      "source_row": 78539,
      "fen": "rnbqkbnr/1ppppppp/p7/8/5P2/8/PPPPP1PP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5143871903419495,
      "target_cp": 10.0,
      "prediction_raw": 0.47548192739486694,
      "prediction_score": 0.47548192739486694,
      "prediction_cp": -17.050576881749873
    },
    {
      "source_row": 18732,
      "fen": "rnbqkb1r/1pp1pppp/p4n2/3p4/1P3P2/5N2/P1PPP1PP/RNBQKB1R w KQkq - 0 4",
      "phase": "opening",
      "target_score": 0.43559950590133667,
      "target_cp": -45.0,
      "prediction_raw": 0.46258780360221863,
      "prediction_score": 0.46258780360221863,
      "prediction_cp": -26.045336090209265
    },
    {
      "source_row": 94029,
      "fen": "rnbqkb1r/ppppp1pp/7n/5p2/8/P2P4/1PP1PPPP/RNBQKBNR w KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.799239993095398,
      "target_cp": 240.0,
      "prediction_raw": 0.49435073137283325,
      "prediction_score": 0.49435073137283325,
      "prediction_cp": -3.9256809590068062
    },
    {
      "source_row": 83212,
      "fen": "rnbqkbnr/p1pp1ppp/1p2p3/8/5P2/5N2/PPPPP1PP/RNBQKB1R w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5100724697113037,
      "target_cp": 7.0,
      "prediction_raw": 0.4846044182777405,
      "prediction_score": 0.4846044182777405,
      "prediction_cp": -10.701328717151725
    },
    {
      "source_row": 36562,
      "fen": "rnbqkbnr/pppppppp/8/8/8/5NPP/PPPPPP2/RNBQKB1R b KQkq - 2 3",
      "phase": "opening",
      "target_score": 0.5938553810119629,
      "target_cp": 66.0,
      "prediction_raw": 0.4802541136741638,
      "prediction_score": 0.4802541136741638,
      "prediction_cp": -13.727986848355595
    },
    {
      "source_row": 31355,
      "fen": "rnbqkbnr/pp1ppppp/2p5/8/1P6/2N5/P1PPPPPP/R1BQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.3992217481136322,
      "target_cp": -71.0,
      "prediction_raw": 0.4522281885147095,
      "prediction_score": 0.4522281885147095,
      "prediction_cp": -33.29682001735982
    },
    {
      "source_row": 86665,
      "fen": "r1bqkbnr/pppp1ppp/n7/4p3/4P1P1/8/PPPP1P1P/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.5201367139816284,
      "target_cp": 14.0,
      "prediction_raw": 0.47147390246391296,
      "prediction_score": 0.47147390246391296,
      "prediction_cp": -19.84351141862183
    },
    {
      "source_row": 89509,
      "fen": "rnbqkbnr/pppppp1p/8/6p1/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.39096739888191223,
      "target_cp": -77.0,
      "prediction_raw": 0.4609717130661011,
      "prediction_score": 0.4609717130661011,
      "prediction_cp": -27.174912099290534
    },
    {
      "source_row": 14236,
      "fen": "rn2kbnr/ppp1pppp/3qb3/3P4/1P6/3B4/P1PP1PPP/RNBQK1NR b KQkq - 0 4",
      "phase": "opening",
      "target_score": 0.46981531381607056,
      "target_cp": -21.0,
      "prediction_raw": 0.31060078740119934,
      "prediction_score": 0.31060078740119934,
      "prediction_cp": -138.5072922681752
    },
    {
      "source_row": 58004,
      "fen": "rnbqkbnr/ppppp1pp/8/5p2/8/7P/PPPPPPP1/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5558909773826599,
      "target_cp": 39.0,
      "prediction_raw": 0.508690595626831,
      "prediction_score": 0.508690595626831,
      "prediction_cp": 6.0394525938718395
    },
    {
      "source_row": 95197,
      "fen": "rnbqkb1r/ppppp1pp/5n2/5p2/3P1P2/P7/1PP1P1PP/RNBQKBNR b KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.4928049147129059,
      "target_cp": -5.0,
      "prediction_raw": 0.425342857837677,
      "prediction_score": 0.425342857837677,
      "prediction_cp": -52.26786560009856
    },
    {
      "source_row": 12517,
      "fen": "rnbqkbnr/p2ppppp/8/1pp5/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
      "phase": "opening",
      "target_score": 0.465516060590744,
      "target_cp": -24.0,
      "prediction_raw": 0.4566609859466553,
      "prediction_score": 0.4566609859466553,
      "prediction_cp": -30.19079214504028
    },
    {
      "source_row": 57930,
      "fen": "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/8/PPP2PPP/RNBQKBR1 b Qkq - 1 5",
      "phase": "opening",
      "target_score": 0.47411906719207764,
      "target_cp": -18.0,
      "prediction_raw": 0.40026986598968506,
      "prediction_score": 0.40026986598968506,
      "prediction_cp": -70.24119004661122
    },
    {
      "source_row": 50049,
      "fen": "rnbqkbnr/pp1ppppp/8/2p5/8/1PP5/P2PPPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.42853689193725586,
      "target_cp": -50.0,
      "prediction_raw": 0.4394344091415405,
      "prediction_score": 0.4394344091415405,
      "prediction_cp": -42.292950161276934
    },
    {
      "source_row": 45246,
      "fen": "rnbqkbnr/ppp1p1pp/3p4/5p2/8/P1P1P3/1P1P1PPP/RNBQKBNR b KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.4798632860183716,
      "target_cp": -14.0,
      "prediction_raw": 0.4103087782859802,
      "prediction_score": 0.4103087782859802,
      "prediction_cp": -63.00554172109677
    },
    {
      "source_row": 61976,
      "fen": "rnbqkbnr/ppp1p1pp/5p2/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      "phase": "opening",
      "target_score": 0.7533860802650452,
      "target_cp": 194.0,
      "prediction_raw": 0.4649553596973419,
      "prediction_score": 0.4649553596973419,
      "prediction_cp": -24.391503850562422
    },
    {
      "source_row": 54620,
      "fen": "r1bqkb1r/pppp1ppp/2n2n2/8/3NP3/1P6/P1P2PPP/RNBQKB1R b KQkq - 0 5",
      "phase": "opening",
      "target_score": 0.26300522685050964,
      "target_cp": -179.0,
      "prediction_raw": 0.36845365166664124,
      "prediction_score": 0.36845365166664124,
      "prediction_cp": -93.60894530595381
    },
    {
      "source_row": 39355,
      "fen": "rnbqkbnr/pp1ppppp/2p5/8/4P1P1/8/PPPP1P1P/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.4215032458305359,
      "target_cp": -55.0,
      "prediction_raw": 0.40758079290390015,
      "prediction_score": 0.40758079290390015,
      "prediction_cp": -64.96616827651806
    },
    {
      "source_row": 17556,
      "fen": "rnbqkbnr/pp1ppppp/2p5/8/3P4/6P1/PPP1PP1P/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5201367139816284,
      "target_cp": 14.0,
      "prediction_raw": 0.46585920453071594,
      "prediction_score": 0.46585920453071594,
      "prediction_cp": -23.76042723077271
    },
    {
      "source_row": 19926,
      "fen": "rnbqkb1r/pp3ppp/4pn2/2pp4/3PP3/2N5/PPPK1PPP/R1BQ1BNR w kq - 0 5",
      "phase": "opening",
      "target_score": 0.22484713792800903,
      "target_cp": -215.0,
      "prediction_raw": 0.453105092048645,
      "prediction_score": 0.453105092048645,
      "prediction_cp": -32.681974755797896
    },
    {
      "source_row": 23505,
      "fen": "rnbqkb1r/pppppppp/5n2/8/PP6/8/2PPPPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.40337082743644714,
      "target_cp": -68.0,
      "prediction_raw": 0.4101235866546631,
      "prediction_score": 0.4101235866546631,
      "prediction_cp": -63.138513667184824
    },
    {
      "source_row": 85750,
      "fen": "rnbqkbnr/pppppp1p/8/6p1/1P6/2P5/P2PPPPP/RNBQKBNR b KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.5158249735832214,
      "target_cp": 11.0,
      "prediction_raw": 0.4750749170780182,
      "prediction_score": 0.4750749170780182,
      "prediction_cp": -17.33408971579494
    },
    {
      "source_row": 92278,
      "fen": "rnbqkbnr/pppppp1p/8/6p1/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      "phase": "opening",
      "target_score": 0.7690759301185608,
      "target_cp": 209.0,
      "prediction_raw": 0.5083653330802917,
      "prediction_score": 0.5083653330802917,
      "prediction_cp": 5.813371251152769
    },
    {
      "source_row": 96849,
      "fen": "1rb2rk1/p2q2bp/2p1ppp1/2R5/3P4/2B1QN2/PP3PPP/R5K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6090326309204102,
      "target_cp": 77.0,
      "prediction_raw": 0.5723550319671631,
      "prediction_score": 0.5723550319671631,
      "prediction_cp": 50.632855667436075
    },
    {
      "source_row": 62599,
      "fen": "1rb2rk1/p3ppbp/2p3p1/3n4/4N3/1P2BB2/P1PR1PPP/2K4R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5459219217300415,
      "target_cp": 32.0,
      "prediction_raw": 0.4659753441810608,
      "prediction_score": 0.4659753441810608,
      "prediction_cp": -23.679348400445356
    },
    {
      "source_row": 12087,
      "fen": "1rb2rk1/p1qnppbp/3p2p1/1N6/Q1P5/5BP1/PP2PP1P/R1B2RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6090326309204102,
      "target_cp": 77.0,
      "prediction_raw": 0.5135501623153687,
      "prediction_score": 0.5135501623153687,
      "prediction_cp": 9.417923201880447
    },
    {
      "source_row": 70812,
      "fen": "1rb2rk1/p2p1ppp/3R4/8/2P5/1PN5/P3P1BP/4K2R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9574765563011169,
      "target_cp": 541.0,
      "prediction_raw": 0.601912796497345,
      "prediction_score": 0.601912796497345,
      "prediction_cp": 71.82214358891783
    },
    {
      "source_row": 90097,
      "fen": "1rb2rk1/p2n3p/4p1p1/1pp5/5pPP/1P2N3/P2PPPB1/2R1K2R w K - 0 1",
      "phase": "middlegame",
      "target_score": 0.5896835327148438,
      "target_cp": 63.0,
      "prediction_raw": 0.5310319662094116,
      "prediction_score": 0.5310319662094116,
      "prediction_cp": 21.590969546619426
    },
    {
      "source_row": 28494,
      "fen": "1rb2rk1/p3pp1p/2P2bp1/q3n3/4P3/2N2N2/PP1Q1PPP/2R1KB1R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.44553062319755554,
      "target_cp": -38.0,
      "prediction_raw": 0.37743693590164185,
      "prediction_score": 0.37743693590164185,
      "prediction_cp": -86.93558122989576
    },
    {
      "source_row": 84271,
      "fen": "1rb2rk1/p2nbppp/4p3/2ppP3/3P1P2/4RN2/1PP1BNPP/5RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.2509169280529022,
      "target_cp": -190.0,
      "prediction_raw": 0.40382832288742065,
      "prediction_score": 0.40382832288742065,
      "prediction_cp": -67.66982576581673
    },
    {
      "source_row": 48137,
      "fen": "1rb2rk1/p2p1pbp/5qp1/1p1Bp3/4P3/3P1P2/PPP2P1P/R2QK2R w KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.06647036969661713,
      "target_cp": -459.0,
      "prediction_raw": 0.4411677122116089,
      "prediction_score": 0.4411677122116089,
      "prediction_cp": -41.07110813192881
    },
    {
      "source_row": 44757,
      "fen": "1rb2rk1/p2pb1pp/2p1p3/4Pp2/2P1NP2/P7/1P1RB1PP/4K2R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.48417502641677856,
      "target_cp": -11.0,
      "prediction_raw": 0.4708702564239502,
      "prediction_score": 0.4708702564239502,
      "prediction_cp": -20.264366706578656
    },
    {
      "source_row": 25665,
      "fen": "1rb2rk1/p2npp1p/3p2p1/2p3P1/2P1P3/P3B3/4BP1P/2KR3R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.2824082672595978,
      "target_cp": -162.0,
      "prediction_raw": 0.3355117738246918,
      "prediction_score": 0.3355117738246918,
      "prediction_cp": -118.71181005918999
    },
    {
      "source_row": 29491,
      "fen": "1rb2rk1/p3ppbp/1qp2npB/7P/4p3/1PN2P2/P1PQ2P1/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6007782220840454,
      "target_cp": 71.0,
      "prediction_raw": 0.3672759532928467,
      "prediction_score": 0.3672759532928467,
      "prediction_cp": -94.4887381996252
    },
    {
      "source_row": 52501,
      "fen": "1rb2rk1/p3qppp/1p2P3/4B3/8/6P1/PP3NBP/2RQ2K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9579428434371948,
      "target_cp": 543.0,
      "prediction_raw": 0.6916304230690002,
      "prediction_score": 0.6916304230690002,
      "prediction_cp": 140.32102543524763
    },
    {
      "source_row": 94007,
      "fen": "1rb2rk1/p3bpp1/3ppn1p/2q3B1/B3PP1P/2N5/PPP3P1/2KRQ2R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6212967038154602,
      "target_cp": 86.0,
      "prediction_raw": 0.551510214805603,
      "prediction_score": 0.551510214805603,
      "prediction_cp": 35.92040185748466
    },
    {
      "source_row": 68537,
      "fen": "1rb2rk1/p3n1qp/4p1p1/1pN2p2/P2P4/2P3P1/1P3QBP/R4R1K b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6887735724449158,
      "target_cp": 138.0,
      "prediction_raw": 0.5196239948272705,
      "prediction_score": 0.5196239948272705,
      "prediction_cp": 13.643156473559968
    },
    {
      "source_row": 44966,
      "fen": "1rb2rk1/p2p1pp1/1qp1pb1p/8/3p4/1PPBP1P1/P1Q2PP1/RN2R1K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.365256667137146,
      "target_cp": -96.0,
      "prediction_raw": 0.39889952540397644,
      "prediction_score": 0.39889952540397644,
      "prediction_cp": -71.23342050455771
    },
    {
      "source_row": 63459,
      "fen": "1rb2rk1/p3q1p1/2p4p/2n1pp2/2P1p3/4P3/PPQNBPPP/2R2RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.46408405900001526,
      "target_cp": -25.0,
      "prediction_raw": 0.5211499929428101,
      "prediction_score": 0.5211499929428101,
      "prediction_cp": 14.705295225944926
    },
    {
      "source_row": 60313,
      "fen": "1rb2rk1/p3p1bp/6p1/3R4/4N1p1/5P2/PP2B1PP/1K5R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.42010024189949036,
      "target_cp": -56.0,
      "prediction_raw": 0.4523783326148987,
      "prediction_score": 0.4523783326148987,
      "prediction_cp": -33.19153108943564
    },
    {
      "source_row": 18543,
      "fen": "1rb2rk1/p4p2/5p1p/6q1/3pP3/3P1R1Q/PP4P1/6K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.36827895045280457,
      "prediction_score": 0.36827895045280457,
      "prediction_cp": -93.73938057721017
    },
    {
      "source_row": 70098,
      "fen": "1rb2rk1/p3q3/1p1p3p/P1nPp1pP/2P5/R3B3/4BPP1/3Q1RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6492949724197388,
      "target_cp": 107.0,
      "prediction_raw": 0.5577661991119385,
      "prediction_score": 0.5577661991119385,
      "prediction_cp": 40.32010348088196
    },
    {
      "source_row": 93143,
      "fen": "1rb2rk1/p3ppbp/1q4p1/3p4/8/PP1B4/2P2PPP/1RBQ1RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4257197976112366,
      "target_cp": -52.0,
      "prediction_raw": 0.4285215735435486,
      "prediction_score": 0.4285215735435486,
      "prediction_cp": -50.01085970474281
    },
    {
      "source_row": 69465,
      "fen": "1rb2rk1/p3Npp1/2qp3p/2b5/4P3/8/P1P2PPP/R2Q1RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9370137453079224,
      "target_cp": 469.0,
      "prediction_raw": 0.2677368223667145,
      "prediction_score": 0.2677368223667145,
      "prediction_cp": -174.7836364892072
    },
    {
      "source_row": 44362,
      "fen": "1rb2rk1/p3p1bp/2p3p1/4Pp2/3Pp3/4B3/P2N1PPP/R1R3K1 w - f6 0 1",
      "phase": "middlegame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.4340619444847107,
      "prediction_score": 0.4340619444847107,
      "prediction_cp": -46.0868746741429
    },
    {
      "source_row": 63816,
      "fen": "1rb2rk1/p4p1p/1p2pp2/3P4/2P1B3/1P4P1/5P1P/3R1RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5230095982551575,
      "target_cp": 16.0,
      "prediction_raw": 0.524604320526123,
      "prediction_score": 0.524604320526123,
      "prediction_cp": 17.110653040100022
    },
    {
      "source_row": 23196,
      "fen": "1rb2rk1/p3qpbp/2p3p1/5n2/5P2/2N1B3/PPPQ1KPP/4RB1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.18814000487327576,
      "target_cp": -254.0,
      "prediction_raw": 0.5312052965164185,
      "prediction_score": 0.5312052965164185,
      "prediction_cp": 21.711880125587758
    },
    {
      "source_row": 37382,
      "fen": "1rb2rk1/p2p2pp/3qpp2/8/3p1P2/P5P1/1P2K1BP/R1BQR3 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5341609716415405,
      "prediction_score": 0.5341609716415405,
      "prediction_cp": 23.774512782165672
    },
    {
      "source_row": 50854,
      "fen": "1rb2rk1/p2n1p1p/6p1/1Bp5/4q2P/2Q2N2/PP3PP1/R4K1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4884891211986542,
      "target_cp": -8.0,
      "prediction_raw": 0.4186595678329468,
      "prediction_score": 0.4186595678329468,
      "prediction_cp": -57.02780333606297
    },
    {
      "source_row": 80559,
      "fen": "1rb2rk1/p3qppp/1nBB4/8/2P5/1P6/P4PPP/R2Q1RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.969517171382904,
      "target_cp": 601.0,
      "prediction_raw": 0.6678842306137085,
      "prediction_score": 0.6678842306137085,
      "prediction_cp": 121.3646769578865
    },
    {
      "source_row": 20709,
      "fen": "1rb2rk1/p3pp1p/2pp2p1/q7/6P1/2P1Q2P/P1P1BP2/R3K2R b KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.20354530215263367,
      "target_cp": -237.0,
      "prediction_raw": 0.19686898589134216,
      "prediction_score": 0.19686898589134216,
      "prediction_cp": -244.2436371985496
    },
    {
      "source_row": 29793,
      "fen": "1rb2rk1/p3qppp/2pp4/2n1p3/2P1P3/1P1B1QNP/P4PP1/R4RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4928049147129059,
      "target_cp": -5.0,
      "prediction_raw": 0.48910772800445557,
      "prediction_score": 0.48910772800445557,
      "prediction_cp": -7.569923425460471
    },
    {
      "source_row": 78208,
      "fen": "1rb2rk1/p2p2pp/1qp1pp2/4P3/1bP2P2/2NQ4/PPKB2PP/3R1R2 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5813014507293701,
      "target_cp": 57.0,
      "prediction_raw": 0.41444262862205505,
      "prediction_score": 0.41444262862205505,
      "prediction_cp": -60.04201318245394
    },
    {
      "source_row": 87146,
      "fen": "1rb2rk1/p3pp1p/5bp1/8/5q1P/1QN2P2/PPPR2P1/2K2B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.03892746940255165,
      "target_cp": -557.0,
      "prediction_raw": 0.31839293241500854,
      "prediction_score": 0.31839293241500854,
      "prediction_cp": -132.2282664561536
    },
    {
      "source_row": 30013,
      "fen": "1rb2rk1/p3nppp/4p3/qBPp2N1/3P4/2RQ4/P4PPP/4K2R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.11354237794876099,
      "target_cp": -357.0,
      "prediction_raw": 0.4251589775085449,
      "prediction_score": 0.4251589775085449,
      "prediction_cp": -52.398559715781104
    },
    {
      "source_row": 95615,
      "fen": "1rb2rk1/p2nqpp1/1pQ1p2p/3p4/3P4/3BPN2/PP3PPP/2R2RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6374083757400513,
      "target_cp": 98.0,
      "prediction_raw": 0.5457037091255188,
      "prediction_score": 0.5457037091255188,
      "prediction_cp": 31.847085866163034
    },
    {
      "source_row": 85173,
      "fen": "1rb2rk1/p4pbp/4p1p1/q1pp4/8/2PP1N1P/PP3PP1/R1BQ1RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4555054306983948,
      "target_cp": -31.0,
      "prediction_raw": 0.43915924429893494,
      "prediction_score": 0.43915924429893494,
      "prediction_cp": -42.487014697299614
    },
    {
      "source_row": 35520,
      "fen": "1rb2rk1/p2n2pp/1q2p3/3pPp2/1ppP1P2/5NP1/P1Q1N1BP/R4RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5629847049713135,
      "target_cp": 44.0,
      "prediction_raw": 0.4958019256591797,
      "prediction_score": 0.4958019256591797,
      "prediction_cp": -2.9171893840219143
    },
    {
      "source_row": 85692,
      "fen": "1rb2rk1/p3qppp/4p3/3p4/2pNn1P1/2P1Q2P/PP2PP2/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.06264739483594894,
      "target_cp": -470.0,
      "prediction_raw": 0.4372340142726898,
      "prediction_score": 0.4372340142726898,
      "prediction_cp": -43.84556002958048
    },
    {
      "source_row": 95840,
      "fen": "1rb2rk1/p3bppp/8/1ppBP3/8/6P1/PP2PP1P/R1BR2K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.7414335012435913,
      "target_cp": 183.0,
      "prediction_raw": 0.7222943305969238,
      "prediction_score": 0.7222943305969238,
      "prediction_cp": 166.0517839996705
    },
    {
      "source_row": 43385,
      "fen": "1rb2rk1/p3ppbp/q5p1/1n6/4P3/2N1Q1PP/PP2NPB1/3R1RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6374083757400513,
      "target_cp": 98.0,
      "prediction_raw": 0.5430139303207397,
      "prediction_score": 0.5430139303207397,
      "prediction_cp": 29.963203734503864
    },
    {
      "source_row": 42765,
      "fen": "1rb2rk1/p3nppp/4p3/qBPp4/3P4/1QR2N2/P4PPP/5RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.09478739649057388,
      "target_cp": -392.0,
      "prediction_raw": 0.44287270307540894,
      "prediction_score": 0.44287270307540894,
      "prediction_cp": -39.87020987783655
    },
    {
      "source_row": 70747,
      "fen": "1rb2rk1/p4p2/1q4pp/2pPN3/2B5/8/PPQ2PPP/1K1R3R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9586331248283386,
      "target_cp": 546.0,
      "prediction_raw": 0.5153915882110596,
      "prediction_score": 0.5153915882110596,
      "prediction_cp": 10.698551108591808
    },
    {
      "source_row": 97234,
      "fen": "1rb2rk1/p3pp2/2B3pp/2p5/2P5/2P1P3/P4PPP/R4RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.47411906719207764,
      "target_cp": -18.0,
      "prediction_raw": 0.5564077496528625,
      "prediction_score": 0.5564077496528625,
      "prediction_cp": 39.36368795823195
    },
    {
      "source_row": 64966,
      "fen": "1rb2rk1/p3ppbp/2B3pn/4p3/1q3PP1/1QN1B2P/PPP5/R3K2R w KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.7680519819259644,
      "target_cp": 208.0,
      "prediction_raw": 0.44882410764694214,
      "prediction_score": 0.44882410764694214,
      "prediction_cp": -35.68561512039294
    },
    {
      "source_row": 93753,
      "fen": "1rb2rk1/p4p1p/2p1pbp1/7P/1P4P1/2P1BP2/q2Q4/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.04825270175933838,
      "target_cp": -518.0,
      "prediction_raw": 0.25782161951065063,
      "prediction_score": 0.25782161951065063,
      "prediction_cp": -183.67558687202254
    },
    {
      "source_row": 47995,
      "fen": "1rb2rk1/p3q1p1/6np/n1p1pp2/8/1P3QN1/P1PP1PPP/RN2RBK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.591075599193573,
      "target_cp": 64.0,
      "prediction_raw": 0.6675683259963989,
      "prediction_score": 0.6675683259963989,
      "prediction_cp": 121.11733041952218
    },
    {
      "source_row": 28037,
      "fen": "1rb2rk1/p4p2/3q3p/2pp3n/6pP/1P1B2P1/P1P3PK/RN1QR3 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.2552695870399475,
      "target_cp": -186.0,
      "prediction_raw": 0.5637741684913635,
      "prediction_score": 0.5637741684913635,
      "prediction_cp": 44.5575175810513
    },
    {
      "source_row": 92244,
      "fen": "1rb2rk1/p1q3p1/3pp1Qp/2bpPp2/1P3PP1/2PB4/P6P/1RB1K2R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.30753660202026367,
      "target_cp": -141.0,
      "prediction_raw": 0.4169299304485321,
      "prediction_score": 0.4169299304485321,
      "prediction_cp": -58.26307012524903
    },
    {
      "source_row": 40409,
      "fen": "1rb2rk1/p3b1p1/2p1q2p/n3pp2/7P/1PNQ2N1/PBPP1PP1/R4RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.36259162425994873,
      "target_cp": -98.0,
      "prediction_raw": 0.5295055508613586,
      "prediction_score": 0.5295055508613586,
      "prediction_cp": 20.526405281751472
    },
    {
      "source_row": 31867,
      "fen": "1rb2rk1/p2pR2p/2p2np1/q7/3Q4/2N5/PPP3PP/2K2B1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.7302454113960266,
      "target_cp": 173.0,
      "prediction_raw": 0.4757433235645294,
      "prediction_score": 0.4757433235645294,
      "prediction_cp": -16.868507075317353
    },
    {
      "source_row": 76824,
      "fen": "1rb2rk1/p3pp2/2p3p1/q6p/5N1P/1B4Q1/P1Pb2P1/1K5R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.028844337910413742,
      "prediction_score": 0.028844337910413742,
      "prediction_cp": -610.8913087583337
    },
    {
      "source_row": 78060,
      "fen": "1rb2rk1/p3bp2/5p1p/3Bp3/N5P1/P7/1PP2P1P/R3K2R b KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.46981531381607056,
      "target_cp": -21.0,
      "prediction_raw": 0.5046414136886597,
      "prediction_score": 0.5046414136886597,
      "prediction_cp": 3.225277208935938
    },
    {
      "source_row": 34759,
      "fen": "1rb2rk1/p4pb1/2pp2pp/4P1q1/2Q5/P1P4P/2PR1PP1/2K2BNR b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.04592836648225784,
      "target_cp": -527.0,
      "prediction_raw": 0.4531645178794861,
      "prediction_score": 0.4531645178794861,
      "prediction_cp": -32.64031546613917
    },
    {
      "source_row": 93846,
      "fen": "1rb2rk1/p4pbp/2pp2p1/5n2/q4PP1/1P6/P1P1QB1P/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.011095688678324223,
      "target_cp": -780.0,
      "prediction_raw": 0.16984383761882782,
      "prediction_score": 0.16984383761882782,
      "prediction_cp": -275.64400077699236
    },
    {
      "source_row": 14382,
      "fen": "1rb2rk1/p2n1p1p/2B3p1/8/3q4/2B5/PP2QPPP/2R2RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.8519483208656311,
      "target_cp": 304.0,
      "prediction_raw": 0.587944746017456,
      "prediction_score": 0.587944746017456,
      "prediction_cp": 61.75242309024998
    },
    {
      "source_row": 38529,
      "fen": "1rb2rk1/p3pp1p/6p1/P2p4/3q1P2/1P2nNPP/4Q1B1/R4R1K b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.10568003356456757,
      "target_cp": -371.0,
      "prediction_raw": 0.29709556698799133,
      "prediction_score": 0.29709556698799133,
      "prediction_cp": -149.60004424831516
    },
    {
      "source_row": 11526,
      "fen": "1rb2rk1/p1q3pp/4p3/1pP2p2/n1p1NP2/2P3PP/P1Q2PB1/R3R1K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.33771219849586487,
      "target_cp": -117.0,
      "prediction_raw": 0.6382048726081848,
      "prediction_score": 0.6382048726081848,
      "prediction_cp": 98.59896084262289
    },
    {
      "source_row": 37146,
      "fen": "1rb2rk1/p2p1ppp/2p5/4N3/3Bn3/P4P2/2P3PP/R4RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5344839692115784,
      "target_cp": 24.0,
      "prediction_raw": 0.32400381565093994,
      "prediction_score": 0.32400381565093994,
      "prediction_cp": -127.75764793878412
    },
    {
      "source_row": 11200,
      "fen": "1rb2rk1/p3b1pp/2p5/1pPqNp2/3Pp3/1PB3P1/P3QPBP/R5K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.3338605761528015,
      "target_cp": -120.0,
      "prediction_raw": 0.5517964363098145,
      "prediction_score": 0.5517964363098145,
      "prediction_cp": 36.121434407500416
    },
    {
      "source_row": 12040,
      "fen": "1rb2rk1/p2np1bp/3p2p1/2pP1p2/4P3/2P2N1P/PP1N1PP1/2KR1B1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5558909773826599,
      "target_cp": 39.0,
      "prediction_raw": 0.5213072299957275,
      "prediction_score": 0.5213072299957275,
      "prediction_cp": 14.814752030509068
    },
    {
      "source_row": 22703,
      "fen": "1rb2rk1/p3b1pp/4p3/2pp1p2/3P1P1P/2PBPN2/PP4P1/1R2K2R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.6712405681610107,
      "target_cp": 124.0,
      "prediction_raw": 0.4674524962902069,
      "prediction_score": 0.4674524962902069,
      "prediction_cp": -22.648347979610065
    },
    {
      "source_row": 11080,
      "fen": "1rb2rk1/p3ppBp/1qp3p1/2n5/4P3/1P3P2/P3B1PP/3RQR1K w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9146407842636108,
      "target_cp": 412.0,
      "prediction_raw": 0.5518813133239746,
      "prediction_score": 0.5518813133239746,
      "prediction_cp": 36.18105385179817
    },
    {
      "source_row": 18748,
      "fen": "1rb2rk1/p4p1p/1p4p1/2p1P3/1PBq4/P3R3/4QRPP/6K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.18378309905529022,
      "target_cp": -259.0,
      "prediction_raw": 0.35776352882385254,
      "prediction_score": 0.35776352882385254,
      "prediction_cp": -101.63955958480724
    },
    {
      "source_row": 79368,
      "fen": "1rb2rk1/p1qpp1bp/2p1p1p1/3n4/7Q/N1PB4/PP3PPP/R1B2RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.19618147611618042,
      "target_cp": -245.0,
      "prediction_raw": 0.3429468274116516,
      "prediction_score": 0.3429468274116516,
      "prediction_cp": -112.94949082491861
    },
    {
      "source_row": 36884,
      "fen": "1rb2rk1/p2p1p2/1p1Ppp1p/8/P1PN1PP1/8/4K2P/1R5R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4813002347946167,
      "target_cp": -13.0,
      "prediction_raw": 0.4549368619918823,
      "prediction_score": 0.4549368619918823,
      "prediction_cp": -31.398273808009485
    },
    {
      "source_row": 54084,
      "fen": "1rb2rk1/p4p1p/5p2/2n1p3/8/P3PN2/1P3PPP/1R2KB1R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.19168232381343842,
      "target_cp": -250.0,
      "prediction_raw": 0.5210276246070862,
      "prediction_score": 0.5210276246070862,
      "prediction_cp": 14.620113462554315
    },
    {
      "source_row": 57960,
      "fen": "1rb2rk1/p1qp2pp/4pb2/3p4/5P2/P7/RP3NPP/2BQKB1R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.7479995489120483,
      "target_cp": 189.0,
      "prediction_raw": 0.40405869483947754,
      "prediction_score": 0.40405869483947754,
      "prediction_cp": -67.50361243269236
    },
    {
      "source_row": 41990,
      "fen": "1rb2rk1/p4p1p/4p2b/2ppP3/8/6B1/PPPNB2P/1R3RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.46694859862327576,
      "target_cp": -23.0,
      "prediction_raw": 0.5688890814781189,
      "prediction_score": 0.5688890814781189,
      "prediction_cp": 48.1754305668729
    },
    {
      "source_row": 93227,
      "fen": "1rb2rk1/p2pppbp/2p3p1/8/4P3/1P3P2/P1PN2PP/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.39233893156051636,
      "target_cp": -76.0,
      "prediction_raw": 0.3598242402076721,
      "prediction_score": 0.3598242402076721,
      "prediction_cp": -100.08352342659035
    },
    {
      "source_row": 20873,
      "fen": "1rb2rk1/p4p2/1qp1p1pp/3pP3/6P1/1PP1P3/2QN1PP1/1R3RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5966292023658752,
      "target_cp": 68.0,
      "prediction_raw": 0.4912686049938202,
      "prediction_score": 0.4912686049938202,
      "prediction_cp": -6.067811514056338
    },
    {
      "source_row": 57701,
      "fen": "1rb2rk1/p2p1pp1/2pb1q1p/4p3/N1B1P3/8/PPP2PPP/1R1Q1RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.47124943137168884,
      "target_cp": -20.0,
      "prediction_raw": 0.4366910457611084,
      "prediction_score": 0.4366910457611084,
      "prediction_cp": -44.22894713116798
    },
    {
      "source_row": 13871,
      "fen": "1rb2rk1/p2n1ppp/4p3/q2pP3/QppP1P2/2N5/P2NB1PP/1R2K2R b K - 0 1",
      "phase": "middlegame",
      "target_score": 0.5756869316101074,
      "target_cp": 53.0,
      "prediction_raw": 0.47141772508621216,
      "prediction_score": 0.47141772508621216,
      "prediction_cp": -19.882675186281027
    },
    {
      "source_row": 25793,
      "fen": "1rb2rk1/p3pp1p/6PQ/3p4/3q4/1P1B1P2/2PK2P1/3R3R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.939350426197052,
      "target_cp": 476.0,
      "prediction_raw": 0.4385291635990143,
      "prediction_score": 0.4385291635990143,
      "prediction_cp": -42.93148906586172
    },
    {
      "source_row": 86287,
      "fen": "1rb2rk1/p3pp2/2pp1bpp/q2N4/2P1P3/1P6/P2QBPPP/R2R2K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5854986906051636,
      "target_cp": 60.0,
      "prediction_raw": 0.40011167526245117,
      "prediction_score": 0.40011167526245117,
      "prediction_cp": -70.35567413150751
    },
    {
      "source_row": 95343,
      "fen": "1rb2rk1/p2n1pp1/1pB1pq1p/8/3Q4/5N2/PPP2PPP/3R1RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5258809328079224,
      "target_cp": 18.0,
      "prediction_raw": 0.4928044080734253,
      "prediction_score": 0.4928044080734253,
      "prediction_cp": -5.000354608884382
    },
    {
      "source_row": 30830,
      "fen": "1rb2rk1/p3ppbp/2pp2p1/8/2B1PBn1/2N2P2/PqPQ2PP/R4R1K w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6558204889297485,
      "target_cp": 112.0,
      "prediction_raw": 0.45104601979255676,
      "prediction_score": 0.45104601979255676,
      "prediction_cp": -34.12603340248214
    },
    {
      "source_row": 10717,
      "fen": "1rb2rk1/p2p1pp1/1bp2Q1p/4p3/1P2P3/P1NB4/2P2PPP/R3K2R b KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.6161107420921326,
      "prediction_score": 0.6161107420921326,
      "prediction_cp": 82.1811284731336
    },
    {
      "source_row": 86920,
      "fen": "1rb2rk1/p4p2/4p1pp/3pPPN1/1p1P3P/2p1Q1P1/qn2NKB1/R6R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6622877717018127,
      "target_cp": 117.0,
      "prediction_raw": 0.5164302587509155,
      "prediction_score": 0.5164302587509155,
      "prediction_cp": 11.421025182696914
    },
    {
      "source_row": 52706,
      "fen": "1rb2rk1/p2npp1p/2p3PQ/3pP3/5q2/5P2/PPP3P1/2KR1B1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.9894586205482483,
      "target_cp": 789.0,
      "prediction_raw": 0.3824080228805542,
      "prediction_score": 0.3824080228805542,
      "prediction_cp": -83.26986018903847
    },
    {
      "source_row": 72973,
      "fen": "1rb2rk1/p3qpbp/3p2p1/P2P2P1/1P2Pp2/2N5/2BQ2PP/1R2K2R w K - 0 1",
      "phase": "middlegame",
      "target_score": 0.4526514708995819,
      "target_cp": -33.0,
      "prediction_raw": 0.43022453784942627,
      "prediction_score": 0.43022453784942627,
      "prediction_cp": -48.803426128102956
    },
    {
      "source_row": 61264,
      "fen": "1rb2rk1/p3pp1p/2p2np1/6P1/4p3/1PN2P2/PKP3P1/3R1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6212967038154602,
      "target_cp": 86.0,
      "prediction_raw": 0.37173569202423096,
      "prediction_score": 0.37173569202423096,
      "prediction_cp": -91.16325049829531
    },
    {
      "source_row": 57052,
      "fen": "1rb2rk1/p4pbp/q3p1p1/PppP4/4PP2/2P3P1/2QB2BP/R3K2R w KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.27661213278770447,
      "target_cp": -167.0,
      "prediction_raw": 0.4778355360031128,
      "prediction_score": 0.4778355360031128,
      "prediction_cp": -15.411547188481386
    },
    {
      "source_row": 83955,
      "fen": "1rb2rk1/p4pp1/1p1P3n/4p2Q/4Nq2/8/PP3PPP/2R1R1K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.08054361492395401,
      "target_cp": -423.0,
      "prediction_raw": 0.4199715256690979,
      "prediction_score": 0.4199715256690979,
      "prediction_cp": -56.0917872765907
    },
    {
      "source_row": 35421,
      "fen": "1rb2rk1/p3qppp/2p1p3/3pP3/N1n2Q2/P2R4/1PP2PPP/2K2B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.36659228801727295,
      "target_cp": -95.0,
      "prediction_raw": 0.4651724100112915,
      "prediction_score": 0.4651724100112915,
      "prediction_cp": -24.239941897364552
    },
    {
      "source_row": 59089,
      "fen": "1rb2rk1/p4pp1/1pB1p2p/8/1bP5/2N5/PP3PPP/R3K2R w KQ - 0 1",
      "phase": "middlegame",
      "target_score": 0.3992217481136322,
      "target_cp": -71.0,
      "prediction_raw": 0.4562872350215912,
      "prediction_score": 0.4562872350215912,
      "prediction_cp": -30.4524840046898
    },
    {
      "source_row": 43323,
      "fen": "1rb2rk1/p2p1p2/2p4p/6p1/2pRP3/2N5/PPP2RPP/6K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4884891211986542,
      "target_cp": -8.0,
      "prediction_raw": 0.5003639459609985,
      "prediction_score": 0.5003639459609985,
      "prediction_cp": 0.25289560077985535
    },
    {
      "source_row": 69586,
      "fen": "1rb2rk1/p2qb1pp/1p3p2/2pNp3/2P1Q2N/3P3P/PP1B1PP1/R5K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.198003351688385,
      "target_cp": -243.0,
      "prediction_raw": 0.5161400437355042,
      "prediction_score": 0.5161400437355042,
      "prediction_cp": 11.219148974142346
    },
    {
      "source_row": 20685,
      "fen": "1rb2rk1/p2n1pb1/1q2p1p1/1Np1P2P/3p1Pp1/1P6/P1PQ1B2/2KR1B1R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6049128770828247,
      "target_cp": 74.0,
      "prediction_raw": 0.33143842220306396,
      "prediction_score": 0.33143842220306396,
      "prediction_cp": -121.89542449321671
    },
    {
      "source_row": 17503,
      "fen": "1rb2rk1/p3pp1p/3p4/3Pn1PQ/1pp1P3/2P2P2/qP6/1NKR1BN1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.27078765630722046,
      "prediction_score": 0.27078765630722046,
      "prediction_cp": -172.0900592498768
    },
    {
      "source_row": 83736,
      "fen": "1rb2rk1/p2p1p1p/4p1p1/4n3/1p1p4/P2P2P1/1PP2PBP/R2N1RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.44980064034461975,
      "target_cp": -35.0,
      "prediction_raw": 0.4078799784183502,
      "prediction_score": 0.4078799784183502,
      "prediction_cp": -64.75094345798323
    },
    {
      "source_row": 92205,
      "fen": "1rb2rk1/p3bppp/2B1pn2/8/N1p5/6P1/PP2PP1P/R1BR2K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5742802023887634,
      "target_cp": 52.0,
      "prediction_raw": 0.5608479380607605,
      "prediction_score": 0.5608479380607605,
      "prediction_cp": 42.492080527505884
    },
    {
      "source_row": 80888,
      "fen": "1rb2rk1/p3npp1/3b2q1/3p3p/Q7/1PP1BNP1/P4P1P/RN2R1K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5330513715744019,
      "target_cp": 23.0,
      "prediction_raw": 0.481732040643692,
      "prediction_score": 0.481732040643692,
      "prediction_cp": -12.69953107863387
    },
    {
      "source_row": 33417,
      "fen": "1rb2rk1/p3pn1p/2p2pp1/4q2P/8/5Q2/PPP3P1/1K1R1B1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.06718834489583969,
      "target_cp": -457.0,
      "prediction_raw": 0.3546631336212158,
      "prediction_score": 0.3546631336212158,
      "prediction_cp": -103.9881715808433
    },
    {
      "source_row": 76785,
      "fen": "1rb2rk1/p2p2pp/3Np3/4P3/3p3b/P1Q3P1/1P3q1P/R1BK1B1R w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5109272003173828,
      "prediction_score": 0.5109272003173828,
      "prediction_cp": 7.594205669887351
    },
    {
      "source_row": 18801,
      "fen": "1rb2rk1/p2p1p1p/1p2pqp1/2b5/2PNB3/2P1P3/P1Q2PPP/2R2RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.41589903831481934,
      "target_cp": -59.0,
      "prediction_raw": 0.4897676706314087,
      "prediction_score": 0.4897676706314087,
      "prediction_cp": -7.111143522751543
    },
    {
      "source_row": 90550,
      "fen": "1rb2rk1/p3npp1/1p4qp/2P1p3/1P1pN3/P2P2P1/3Q1PBP/R3R1K1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6725096702575684,
      "target_cp": 125.0,
      "prediction_raw": 0.5928988456726074,
      "prediction_score": 0.5928988456726074,
      "prediction_cp": 65.31130839756806
    },
    {
      "source_row": 38644,
      "fen": "1rb2rk1/p2nppb1/3p2p1/q5Pp/3nP2P/2P1BPN1/P2Q2B1/R4RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.21594631671905518,
      "target_cp": -224.0,
      "prediction_raw": 0.25688982009887695,
      "prediction_score": 0.25688982009887695,
      "prediction_cp": -184.5225264654203
    },
    {
      "source_row": 67470,
      "fen": "1rb2rk1/p2nqpp1/1p2p2p/8/3PB1QP/2P2N2/P1P2PP1/2KRR3 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.47699040174484253,
      "target_cp": -16.0,
      "prediction_raw": 0.788416862487793,
      "prediction_score": 0.788416862487793,
      "prediction_cp": 228.50994056700466
    },
    {
      "source_row": 83533,
      "fen": "1rb2rk1/p3bppp/1p2p3/4P3/2B1pPP1/2P1B3/PP5P/1K1R3R b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.6788169145584106,
      "target_cp": 130.0,
      "prediction_raw": 0.47995316982269287,
      "prediction_score": 0.47995316982269287,
      "prediction_cp": -13.937435715171945
    },
    {
      "source_row": 99771,
      "fen": "1rb2rk1/p3ppbp/q1p3p1/3p1P2/1PP1P3/P1NQB3/6PP/R4RK1 w - - 0 1",
      "phase": "middlegame",
      "target_score": 0.4827374815940857,
      "target_cp": -12.0,
      "prediction_raw": 0.4186502695083618,
      "prediction_score": 0.4186502695083618,
      "prediction_cp": -57.03444013719965
    },
    {
      "source_row": 24076,
      "fen": "1rb2rk1/p4pp1/1p1bpq1p/8/Q7/1NPP4/P2B1PPP/3RR1K1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.3124617636203766,
      "target_cp": -137.0,
      "prediction_raw": 0.5047188997268677,
      "prediction_score": 0.5047188997268677,
      "prediction_cp": 3.2791247410296855
    },
    {
      "source_row": 72660,
      "fen": "1rb2rk1/p1qn1pb1/P3p1pp/1B6/3P4/4PNP1/Q2N1PP1/1R3RK1 b - - 0 1",
      "phase": "middlegame",
      "target_score": 0.8179376125335693,
      "target_cp": 261.0,
      "prediction_raw": 0.6054751873016357,
      "prediction_score": 0.6054751873016357,
      "prediction_cp": 74.408811160497
    },
    {
      "source_row": 11197,
      "fen": "1r4Q1/7P/3k4/8/5P2/5K2/8/n1q5 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.6189717054367065,
      "prediction_score": 0.6189717054367065,
      "prediction_cp": 84.28542800572755
    },
    {
      "source_row": 69932,
      "fen": "1r4Q1/8/2R3qk/1P6/3b4/2P4p/6BK/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.792384922504425,
      "prediction_score": 0.792384922504425,
      "prediction_cp": 232.6709253532675
    },
    {
      "source_row": 92084,
      "fen": "1r4k1/1p3p1p/6p1/1N6/5Q2/4P2P/1q3bPK/3R4 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.4476528763771057,
      "prediction_score": 0.4476528763771057,
      "prediction_cp": -36.5082869430344
    },
    {
      "source_row": 35858,
      "fen": "1r4k1/1P3p1p/4p3/3p4/2p3pN/4P1P1/2K5/1R5r b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.2309146374464035,
      "prediction_score": 0.2309146374464035,
      "prediction_cp": -209.00923301623297
    },
    {
      "source_row": 89308,
      "fen": "1rb5/p6p/1p2k1p1/8/3R4/P5P1/6BP/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5430665016174316,
      "target_cp": 30.0,
      "prediction_raw": 0.5472010374069214,
      "prediction_score": 0.5472010374069214,
      "prediction_cp": 32.89659555868427
    },
    {
      "source_row": 16809,
      "fen": "1r4k1/2R3p1/4p2p/8/8/5P2/6PP/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5322556495666504,
      "prediction_score": 0.5322556495666504,
      "prediction_cp": 22.44469169941422
    },
    {
      "source_row": 24821,
      "fen": "1r4k1/2N1Qp2/p1q3pp/8/4R3/2P4P/1P3PK1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9352934956550598,
      "target_cp": 464.0,
      "prediction_raw": 0.6933070421218872,
      "prediction_score": 0.6933070421218872,
      "prediction_cp": 141.68872296828593
    },
    {
      "source_row": 25849,
      "fen": "1r4k1/1r3n1p/4p1p1/4b3/P1Q5/7P/4RPP1/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.571469247341156,
      "prediction_score": 0.571469247341156,
      "prediction_cp": 50.00434834885817
    },
    {
      "source_row": 88490,
      "fen": "1r4k1/1B3pp1/8/8/3B2q1/2P5/2P4p/4RK2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.0679967999458313,
      "prediction_score": 0.0679967999458313,
      "prediction_cp": -454.7715716098128
    },
    {
      "source_row": 58871,
      "fen": "1r4k1/1p2Qpbp/6p1/1B6/8/4PP2/4K2P/7r w - - 0 1",
      "phase": "endgame",
      "target_score": 0.408924400806427,
      "target_cp": -64.0,
      "prediction_raw": 0.23655739426612854,
      "prediction_score": 0.23655739426612854,
      "prediction_cp": -203.53594617465637
    },
    {
      "source_row": 50093,
      "fen": "1r4k1/1r3pp1/7p/8/5QP1/7P/2p2PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.21015581488609314,
      "target_cp": -230.0,
      "prediction_raw": 0.36225438117980957,
      "prediction_score": 0.36225438117980957,
      "prediction_cp": -98.25353486261449
    },
    {
      "source_row": 68626,
      "fen": "1r4k1/2R3pp/p3p3/8/b1N2P2/8/1P4PP/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.487050861120224,
      "target_cp": -9.0,
      "prediction_raw": 0.47610172629356384,
      "prediction_score": 0.47610172629356384,
      "prediction_cp": -16.61888449088268
    },
    {
      "source_row": 70589,
      "fen": "1r4k1/1N4p1/p7/p3p2p/P2rP3/R3K3/6PP/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.058711446821689606,
      "target_cp": -482.0,
      "prediction_raw": 0.23950275778770447,
      "prediction_score": 0.23950275778770447,
      "prediction_cp": -200.7148499953493
    },
    {
      "source_row": 45568,
      "fen": "1rb3k1/p4p1p/8/3R1P2/1p4P1/7P/r7/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.14143607020378113,
      "prediction_score": 0.14143607020378113,
      "prediction_cp": -313.28498314315334
    },
    {
      "source_row": 10045,
      "fen": "1r4k1/1P3p1p/4r3/R1Pp1N2/4p3/2K1P3/8/1R6 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.8741683959960938,
      "prediction_score": 0.8741683959960938,
      "prediction_cp": 336.7221474415625
    },
    {
      "source_row": 85356,
      "fen": "1r4k1/2R2pp1/4p2p/4P3/3q4/6PK/4Q2P/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.20541808009147644,
      "target_cp": -235.0,
      "prediction_raw": 0.25776422023773193,
      "prediction_score": 0.25776422023773193,
      "prediction_cp": -183.72770089699756
    },
    {
      "source_row": 39988,
      "fen": "1r3rk1/7p/5p2/5p2/4n1PK/5q1P/8/1q1N4 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.048263370990753174,
      "prediction_score": 0.048263370990753174,
      "prediction_cp": -517.9596527423563
    },
    {
      "source_row": 37566,
      "fen": "1r4Q1/5P2/p2q4/2R5/6b1/1P1K2k1/P1P5/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.053823526948690414,
      "target_cp": -498.0,
      "prediction_raw": 0.5818204283714294,
      "prediction_score": 0.5818204283714294,
      "prediction_cp": 57.37046093772301
    },
    {
      "source_row": 69654,
      "fen": "1r4k1/1P5p/1n1p2pP/4p1N1/8/6P1/2p2P2/R3K3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5854986906051636,
      "target_cp": 60.0,
      "prediction_raw": 0.540968656539917,
      "prediction_score": 0.540968656539917,
      "prediction_cp": 28.53190483650484
    },
    {
      "source_row": 24417,
      "fen": "1r4k1/1P3pp1/B3p3/B2nP3/8/5n2/5PK1/1R6 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.8672208786010742,
      "target_cp": 326.0,
      "prediction_raw": 0.5028392672538757,
      "prediction_score": 0.5028392672538757,
      "prediction_cp": 1.9729461681723102
    },
    {
      "source_row": 68407,
      "fen": "1r4Q1/7Q/8/6k1/p3K3/P7/6P1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.9707395434379578,
      "prediction_score": 0.9707395434379578,
      "prediction_cp": 608.3286491312574
    },
    {
      "source_row": 83978,
      "fen": "1rb4r/p1R3pp/2N1k3/8/8/1P6/5PPP/3R2K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9481920599937439,
      "target_cp": 505.0,
      "prediction_raw": 0.6959266662597656,
      "prediction_score": 0.6959266662597656,
      "prediction_cp": 143.83405694918577
    },
    {
      "source_row": 29354,
      "fen": "1r4k1/1P1P4/5b1p/5p2/P7/3Q2PP/R3KP2/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.9505692720413208,
      "prediction_score": 0.9505692720413208,
      "prediction_cp": 513.5947059809412
    },
    {
      "source_row": 49940,
      "fen": "1r4k1/1R6/6p1/7p/8/6PP/5PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.7186380624771118,
      "prediction_score": 0.7186380624771118,
      "prediction_cp": 162.89794792033197
    },
    {
      "source_row": 81489,
      "fen": "1r4k1/2N2pP1/1p4p1/p7/1p4P1/1P6/P1R5/3K4 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.8569591641426086,
      "target_cp": 311.0,
      "prediction_raw": 0.8081930875778198,
      "prediction_score": 0.8081930875778198,
      "prediction_cp": 249.86035088700933
    },
    {
      "source_row": 36175,
      "fen": "1r4k1/1q3p2/5Bp1/8/8/8/PPP5/1K5R w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.12524661421775818,
      "prediction_score": 0.12524661421775818,
      "prediction_cp": -337.64785506853434
    },
    {
      "source_row": 71683,
      "fen": "1r4k1/1P4p1/4p3/3p4/8/P2n4/5R1K/4R3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.6293885707855225,
      "target_cp": 92.0,
      "prediction_raw": 0.6011228561401367,
      "prediction_score": 0.6011228561401367,
      "prediction_cp": 71.24963591165361
    },
    {
      "source_row": 60685,
      "fen": "1r4k1/1P3ppp/p7/8/5P2/1P6/P4K1P/3R4 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9553164839744568,
      "target_cp": 532.0,
      "prediction_raw": 0.5985140800476074,
      "prediction_score": 0.5985140800476074,
      "prediction_cp": 69.36162096000805
    },
    {
      "source_row": 55853,
      "fen": "1r4N1/2p4P/5pk1/4p3/8/8/5PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.4905284345149994,
      "prediction_score": 0.4905284345149994,
      "prediction_cp": -6.582305211867514
    },
    {
      "source_row": 61808,
      "fen": "1r4k1/1P1B1pp1/2p3p1/1n2p3/8/6PP/1R3PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.8665566444396973,
      "target_cp": 325.0,
      "prediction_raw": 0.5142825841903687,
      "prediction_score": 0.5142825841903687,
      "prediction_cp": 9.927256700412782
    },
    {
      "source_row": 78444,
      "fen": "1r3rk1/5ppp/p7/8/1Qp1q3/5N2/PP3K2/5R2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.003701599547639489,
      "target_cp": -972.0,
      "prediction_raw": 0.07874149084091187,
      "prediction_score": 0.07874149084091187,
      "prediction_cp": -427.271151615985
    },
    {
      "source_row": 93115,
      "fen": "1r4Q1/7P/3k4/8/5q1K/8/8/n7 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.5571606755256653,
      "prediction_score": 0.5571606755256653,
      "prediction_cp": 39.893710666670785
    },
    {
      "source_row": 37053,
      "fen": "1r4k1/1r6/R3pB2/2b3pR/2P2P2/1P6/2K5/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9677691459655762,
      "target_cp": 591.0,
      "prediction_raw": 0.7590513229370117,
      "prediction_score": 0.7590513229370117,
      "prediction_cp": 199.33863815705806
    },
    {
      "source_row": 27742,
      "fen": "1r4k1/1R3pp1/7p/4P3/5P2/6P1/2r4P/1R4K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5100724697113037,
      "target_cp": 7.0,
      "prediction_raw": 0.568070650100708,
      "prediction_score": 0.568070650100708,
      "prediction_cp": 47.59585438644116
    },
    {
      "source_row": 66269,
      "fen": "1r4k1/2R1n1pp/8/R3N3/4P3/3p2P1/KP5P/4r3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.6712405681610107,
      "target_cp": 124.0,
      "prediction_raw": 0.6244553327560425,
      "prediction_score": 0.6244553327560425,
      "prediction_cp": 88.33591176625724
    },
    {
      "source_row": 42943,
      "fen": "1rb5/5k1p/8/2NP1pp1/2p5/2P4P/4RKP1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.48561280965805054,
      "target_cp": -10.0,
      "prediction_raw": 0.6691642999649048,
      "prediction_score": 0.6691642999649048,
      "prediction_cp": 122.36815827115592
    },
    {
      "source_row": 81398,
      "fen": "1r3rk1/8/2n1b2p/2pQ4/5p2/R3b3/4N2R/2B2K2 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.03065343014895916,
      "target_cp": -600.0,
      "prediction_raw": 0.494021475315094,
      "prediction_score": 0.494021475315094,
      "prediction_cp": -4.1545024476365695
    },
    {
      "source_row": 14175,
      "fen": "1r4k1/2R3pp/5p2/pP2p3/8/3r2P1/5P1P/1R4K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.4302942156791687,
      "prediction_score": 0.4302942156791687,
      "prediction_cp": -48.75404836764337
    },
    {
      "source_row": 63018,
      "fen": "1r4k1/2R2ppp/8/5r2/8/6KP/1R6/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.08949191868305206,
      "target_cp": -403.0,
      "prediction_raw": 0.301713228225708,
      "prediction_score": 0.301713228225708,
      "prediction_cp": -145.77578529870158
    },
    {
      "source_row": 59880,
      "fen": "1r4k1/1p3pp1/p7/4PB2/8/1P6/P4b1P/3R3K w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5028781890869141,
      "target_cp": 2.0,
      "prediction_raw": 0.594144880771637,
      "prediction_score": 0.594144880771637,
      "prediction_cp": 66.20853250202494
    },
    {
      "source_row": 44230,
      "fen": "1r4k1/1q3p1p/2R3p1/3P4/8/2P3QP/5PP1/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9164213538169861,
      "target_cp": 416.0,
      "prediction_raw": 0.645193338394165,
      "prediction_score": 0.645193338394165,
      "prediction_cp": 103.87924376367603
    },
    {
      "source_row": 39910,
      "fen": "1r3rk1/5ppp/6q1/8/8/2Q5/P4P1P/5RKR w - - 0 1",
      "phase": "endgame",
      "target_score": 0.07557395845651627,
      "target_cp": -435.0,
      "prediction_raw": 0.3425259590148926,
      "prediction_score": 0.3425259590148926,
      "prediction_cp": -113.27404772846874
    },
    {
      "source_row": 43700,
      "fen": "1r4b1/2p1R1PP/k1P2B2/pp4P1/8/8/5K2/2R5 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.9683370590209961,
      "prediction_score": 0.9683370590209961,
      "prediction_cp": 594.1901206305091
    },
    {
      "source_row": 85041,
      "fen": "1rb4Q/3kp3/p2p2p1/2p1npP1/8/4K3/8/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.1675606220960617,
      "prediction_score": 0.1675606220960617,
      "prediction_cp": -278.47226076423004
    },
    {
      "source_row": 72561,
      "fen": "1r4k1/1P3p1p/6p1/1R6/8/1N3PbP/1r1R4/5K2 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5244454741477966,
      "target_cp": 17.0,
      "prediction_raw": 0.5411428213119507,
      "prediction_score": 0.5411428213119507,
      "prediction_cp": 28.65374842224207
    },
    {
      "source_row": 71480,
      "fen": "1r4k1/1N1b4/p5p1/3p4/3p4/3P2P1/P1P2P2/1R2K3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.8109791874885559,
      "target_cp": 253.0,
      "prediction_raw": 0.6664226651191711,
      "prediction_score": 0.6664226651191711,
      "prediction_cp": 120.22128980013068
    },
    {
      "source_row": 33108,
      "fen": "1r4k1/2R3p1/3P4/6p1/4qpQ1/8/PKP5/2B5 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.760796070098877,
      "target_cp": 201.0,
      "prediction_raw": 0.701933741569519,
      "prediction_score": 0.701933741569519,
      "prediction_cp": 148.79332128599114
    },
    {
      "source_row": 45845,
      "fen": "1r4k1/1p5p/pR3p2/8/2P5/4P3/7P/3K4 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.49712181091308594,
      "target_cp": -2.0,
      "prediction_raw": 0.41255897283554077,
      "prediction_score": 0.41255897283554077,
      "prediction_cp": -61.391294984860465
    },
    {
      "source_row": 43781,
      "fen": "1r3rk1/6pp/8/4R1P1/3pP3/1P4B1/P6P/4q1K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.20076000690460205,
      "target_cp": -240.0,
      "prediction_raw": 0.03681613504886627,
      "prediction_score": 0.03681613504886627,
      "prediction_cp": -567.0684017445624
    },
    {
      "source_row": 28186,
      "fen": "1r4k1/2R3p1/1r2p1p1/2R1P3/6P1/7P/5P2/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5186997652053833,
      "target_cp": 13.0,
      "prediction_raw": 0.6410260200500488,
      "prediction_score": 0.6410260200500488,
      "prediction_cp": 100.72507533368413
    },
    {
      "source_row": 92565,
      "fen": "1r4R1/p4Q2/3p3k/3P4/2p2P2/7q/PPp1N3/2K5 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.8096081018447876,
      "prediction_score": 0.8096081018447876,
      "prediction_cp": 251.45055274795465
    },
    {
      "source_row": 43646,
      "fen": "1r4k1/2R2p2/p2q4/4pN1p/4P3/1P5P/P4P2/5K2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9798779487609863,
      "target_cp": 675.0,
      "prediction_raw": 0.33391064405441284,
      "prediction_score": 0.33391064405441284,
      "prediction_cp": -119.96089218435742
    },
    {
      "source_row": 13692,
      "fen": "1r3rk1/7p/p4Qp1/7q/2p5/4B3/PPP5/2K3R1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.26423925161361694,
      "prediction_score": 0.26423925161361694,
      "prediction_cp": -177.8957138243256
    },
    {
      "source_row": 43411,
      "fen": "1r4k1/1p6/1P6/r7/3K1R2/3P4/6b1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.04113917425274849,
      "target_cp": -547.0,
      "prediction_raw": 0.4729188084602356,
      "prediction_score": 0.4729188084602356,
      "prediction_cp": -18.836372943343243
    },
    {
      "source_row": 27934,
      "fen": "1rb5/2p2k2/2P5/p1K2p2/P5p1/2N5/8/3R4 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.18464818596839905,
      "target_cp": -258.0,
      "prediction_raw": 0.7965445518493652,
      "prediction_score": 0.7965445518493652,
      "prediction_cp": 237.096299034696
    },
    {
      "source_row": 62047,
      "fen": "1r4k1/1p3p1p/1R4p1/2pN4/P2bP1P1/3P4/6K1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.3950870931148529,
      "target_cp": -74.0,
      "prediction_raw": 0.42423951625823975,
      "prediction_score": 0.42423951625823975,
      "prediction_cp": -53.05229426432866
    },
    {
      "source_row": 98990,
      "fen": "1r4k1/1p1R1p1p/2p3p1/5r2/1P1RP3/7P/4KP2/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.44980064034461975,
      "target_cp": -35.0,
      "prediction_raw": 0.38511937856674194,
      "prediction_score": 0.38511937856674194,
      "prediction_cp": -81.2781735577704
    },
    {
      "source_row": 81992,
      "fen": "1rb5/p1p5/2n1p3/7k/4n3/2P5/1p6/1K6 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.037755511701107025,
      "prediction_score": 0.037755511701107025,
      "prediction_cp": -562.5220286025208
    },
    {
      "source_row": 36923,
      "fen": "1r4k1/1q3pp1/7p/8/3Q3P/6P1/1PR2P1K/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.6049128770828247,
      "target_cp": 74.0,
      "prediction_raw": 0.6400315165519714,
      "prediction_score": 0.6400315165519714,
      "prediction_cp": 99.97475270115467
    },
    {
      "source_row": 43861,
      "fen": "1rb5/2R5/1P4R1/3kp2P/7K/5P2/6P1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9784698486328125,
      "target_cp": 663.0,
      "prediction_raw": 0.973340630531311,
      "prediction_score": 0.973340630531311,
      "prediction_cp": 624.9659916585978
    },
    {
      "source_row": 11604,
      "fen": "1r4k1/1q3pp1/7p/p2QR3/P7/1P4P1/5P1P/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9612873196601868,
      "target_cp": 558.0,
      "prediction_raw": 0.7044287919998169,
      "prediction_score": 0.7044287919998169,
      "prediction_cp": 150.86998877838712
    },
    {
      "source_row": 24841,
      "fen": "1r4k1/2Q2p1n/3P3p/2p4P/8/KPN5/5q2/1R6 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5129491686820984,
      "target_cp": 9.0,
      "prediction_raw": 0.4579077661037445,
      "prediction_score": 0.4579077661037445,
      "prediction_cp": -29.318070534707292
    },
    {
      "source_row": 23191,
      "fen": "1r4k1/1pR2ppp/pP6/8/1P6/5P1P/2P3P1/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.933885931968689,
      "target_cp": 460.0,
      "prediction_raw": 0.7006864547729492,
      "prediction_score": 0.7006864547729492,
      "prediction_cp": 147.75894043519094
    },
    {
      "source_row": 34438,
      "fen": "1r3rk1/6p1/4p2p/8/P2p4/1P1R4/5PPP/R5K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.6622877717018127,
      "target_cp": 117.0,
      "prediction_raw": 0.5464235544204712,
      "prediction_score": 0.5464235544204712,
      "prediction_cp": 32.35156745286828
    },
    {
      "source_row": 70184,
      "fen": "1r4K1/5P2/8/4k3/8/8/8/3R4 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.842789888381958,
      "prediction_score": 0.842789888381958,
      "prediction_cp": 291.6955361384507
    },
    {
      "source_row": 99881,
      "fen": "1r4k1/1p4pp/p7/3N4/4b3/1P6/P4PKP/R4R2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.8870357275009155,
      "target_cp": 358.0,
      "prediction_raw": 0.7334399223327637,
      "prediction_score": 0.7334399223327637,
      "prediction_cp": 175.82777574375498
    },
    {
      "source_row": 47487,
      "fen": "1r4k1/1p3p2/3b2pp/1R6/8/5NPP/5PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.4540780782699585,
      "target_cp": -32.0,
      "prediction_raw": 0.48739901185035706,
      "prediction_score": 0.48739901185035706,
      "prediction_cp": -8.757917872860524
    },
    {
      "source_row": 88369,
      "fen": "1r4k1/1P5p/8/2bP4/p2B4/3K1R2/P7/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9962556958198547,
      "target_cp": 970.0,
      "prediction_raw": 0.7092782855033875,
      "prediction_score": 0.7092782855033875,
      "prediction_cp": 154.93567719627188
    },
    {
      "source_row": 48230,
      "fen": "1r4k1/1P5p/4p1p1/P7/r3B3/4K1P1/3p1P1P/1R6 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.7233878970146179,
      "target_cp": 167.0,
      "prediction_raw": 0.5701699256896973,
      "prediction_score": 0.5701699256896973,
      "prediction_cp": 49.08300291588036
    },
    {
      "source_row": 64817,
      "fen": "1r4k1/2Q2ppp/8/8/8/1P5P/6PK/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9706857800483704,
      "target_cp": 608.0,
      "prediction_raw": 0.7181891202926636,
      "prediction_score": 0.7181891202926636,
      "prediction_cp": 162.51242645916165
    },
    {
      "source_row": 26060,
      "fen": "1r4b1/6p1/5k2/3P4/7p/1p1KNP1P/1R4P1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5381243824958801,
      "prediction_score": 0.5381243824958801,
      "prediction_cp": 26.543053628440504
    },
    {
      "source_row": 28421,
      "fen": "1r3rk1/p4pp1/7p/3q4/8/6P1/P4PBP/R5K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.09283006191253662,
      "target_cp": -396.0,
      "prediction_raw": 0.08451367914676666,
      "prediction_score": 0.08451367914676666,
      "prediction_cp": -413.8899404629617
    },
    {
      "source_row": 50019,
      "fen": "1rbR4/p2B4/4p1k1/8/4p1K1/8/PP4P1/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.7110036015510559,
      "prediction_score": 0.7110036015510559,
      "prediction_cp": 156.3917480542801
    },
    {
      "source_row": 58904,
      "fen": "1rb3Q1/pp6/2n2p1k/8/5P2/P7/1pP2PP1/1K6 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9479085803031921,
      "target_cp": 504.0,
      "prediction_raw": 0.6649929285049438,
      "prediction_score": 0.6649929285049438,
      "prediction_cp": 119.10522105185773
    },
    {
      "source_row": 71226,
      "fen": "1rb5/8/5k2/2R5/2P5/1PK5/8/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5172625184059143,
      "target_cp": 12.0,
      "prediction_raw": 0.6957274079322815,
      "prediction_score": 0.6957274079322815,
      "prediction_cp": 143.67051134065662
    },
    {
      "source_row": 79871,
      "fen": "1r4k1/1p6/1n6/5p2/q7/8/5Kp1/1q5q b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.11473339051008224,
      "prediction_score": 0.11473339051008224,
      "prediction_cp": -354.9537024389059
    },
    {
      "source_row": 38553,
      "fen": "1r4b1/2k5/7p/5Rp1/p6r/P1N5/2P1R2P/2K5 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5201367139816284,
      "target_cp": 14.0,
      "prediction_raw": 0.4782731235027313,
      "prediction_score": 0.4782731235027313,
      "prediction_cp": -15.106893330235991
    },
    {
      "source_row": 51048,
      "fen": "1r4k1/2R2p1p/5pb1/8/8/8/5PPP/2Q3K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9664883017539978,
      "target_cp": 584.0,
      "prediction_raw": 0.9155749082565308,
      "prediction_score": 0.9155749082565308,
      "prediction_cp": 414.08893635216674
    },
    {
      "source_row": 64950,
      "fen": "1r3rk1/p5b1/4Q1R1/2p5/3q4/8/1P2BRPP/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.7665637731552124,
      "prediction_score": 0.7665637731552124,
      "prediction_cp": 206.55201452740744
    },
    {
      "source_row": 98901,
      "fen": "1r4k1/2R3pp/5p2/2B5/1P1pn3/6P1/5P1P/5K2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5190872550010681,
      "prediction_score": 0.5190872550010681,
      "prediction_cp": 13.269631656222499
    },
    {
      "source_row": 31160,
      "fen": "1r4k1/1R3pp1/4p1p1/8/3Q4/4P1q1/5P2/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.7392202615737915,
      "target_cp": 181.0,
      "prediction_raw": 0.23950952291488647,
      "prediction_score": 0.23950952291488647,
      "prediction_cp": -200.70839779410971
    },
    {
      "source_row": 44676,
      "fen": "1r4k1/2R1B2p/4Pnp1/8/4p3/6PP/5P2/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5770924687385559,
      "target_cp": 54.0,
      "prediction_raw": 0.6347591876983643,
      "prediction_score": 0.6347591876983643,
      "prediction_cp": 96.01187828573897
    },
    {
      "source_row": 93847,
      "fen": "1r4k1/2R2R1p/p5p1/4P3/1p3P2/6P1/7r/4K3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5442082285881042,
      "prediction_score": 0.5442082285881042,
      "prediction_cp": 30.799449490935626
    },
    {
      "source_row": 14528,
      "fen": "1r4k1/1p3p2/4p2p/6p1/5q2/1Q4RP/6PK/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.04113917425274849,
      "target_cp": -547.0,
      "prediction_raw": 0.18120551109313965,
      "prediction_score": 0.18120551109313965,
      "prediction_cp": -262.00140356864944
    },
    {
      "source_row": 27163,
      "fen": "1r4k1/1p3pp1/5n2/1R6/6p1/3r2P1/5PBP/1R4K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.4985608756542206,
      "target_cp": -1.0,
      "prediction_raw": 0.43005889654159546,
      "prediction_score": 0.43005889654159546,
      "prediction_cp": -48.92081705405198
    },
    {
      "source_row": 45274,
      "fen": "1r4k1/1bR3p1/6Np/8/8/8/5PPP/6K1 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5882899761199951,
      "target_cp": 62.0,
      "prediction_raw": 0.7055830359458923,
      "prediction_score": 0.7055830359458923,
      "prediction_cp": 151.83412024599988
    },
    {
      "source_row": 59490,
      "fen": "1r4k1/1r3pp1/2p4p/8/7P/1PR1P1P1/2R2PK1/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.5530468821525574,
      "target_cp": 37.0,
      "prediction_raw": 0.6892721056938171,
      "prediction_score": 0.6892721056938171,
      "prediction_cp": 138.4041845205602
    },
    {
      "source_row": 12702,
      "fen": "1r4k1/1P4pp/3Q1p2/p3p2P/4P3/P5P1/5P2/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.8084019422531128,
      "prediction_score": 0.8084019422531128,
      "prediction_cp": 250.09449840202683
    },
    {
      "source_row": 52712,
      "fen": "1r4k1/2R2p1p/4p1p1/8/1p1nP1KP/1P3P2/5P2/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.03065343014895916,
      "target_cp": -600.0,
      "prediction_raw": 0.2772696912288666,
      "prediction_score": 0.2772696912288666,
      "prediction_cp": -166.42954764101043
    },
    {
      "source_row": 73160,
      "fen": "1r4k1/1P6/p2p1Q1p/P7/3P4/4q1P1/7P/5R1K w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9968476891517639,
      "target_cp": 1000.0,
      "prediction_raw": 0.8690600991249084,
      "prediction_score": 0.8690600991249084,
      "prediction_cp": 328.79112117810234
    },
    {
      "source_row": 15437,
      "fen": "1r3rk1/8/1p4q1/4Rb2/3P3Q/6P1/PP4K1/4n3 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.37737300992012024,
      "prediction_score": 0.37737300992012024,
      "prediction_cp": -86.9828428323192
    },
    {
      "source_row": 88085,
      "fen": "1r3rk1/R3Rpp1/2B4p/3P4/8/1n3P2/5P1P/5K2 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.7670249342918396,
      "target_cp": 207.0,
      "prediction_raw": 0.6308873891830444,
      "prediction_score": 0.6308873891830444,
      "prediction_cp": 93.11718526181788
    },
    {
      "source_row": 97786,
      "fen": "1r4k1/2R3p1/4pp1p/8/2PP4/4P2P/5nP1/R6K w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9651583433151245,
      "target_cp": 577.0,
      "prediction_raw": 0.705977201461792,
      "prediction_score": 0.705977201461792,
      "prediction_cp": 152.1638677692223
    },
    {
      "source_row": 79741,
      "fen": "1r4k1/1P4p1/7p/4p3/2qPQ3/2P4P/1R2KP2/8 w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9570053815841675,
      "target_cp": 539.0,
      "prediction_raw": 0.7422701120376587,
      "prediction_score": 0.7422701120376587,
      "prediction_cp": 183.7588755228869
    },
    {
      "source_row": 35947,
      "fen": "1r4k1/1pR5/2p3p1/p6p/P1P5/1P4P1/5PKP/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.8631930947303772,
      "target_cp": 320.0,
      "prediction_raw": 0.6839007139205933,
      "prediction_score": 0.6839007139205933,
      "prediction_cp": 134.06781684750763
    },
    {
      "source_row": 97156,
      "fen": "1r4k1/2R3p1/7p/5p2/1p6/5Pr1/PP1R2P1/2K5 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.5,
      "target_cp": 0.0,
      "prediction_raw": 0.5196214914321899,
      "prediction_score": 0.5196214914321899,
      "prediction_cp": 13.641414253106504
    },
    {
      "source_row": 43588,
      "fen": "1r4k1/2Q2pp1/5q1p/p3p3/4P1P1/8/2K5/8 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.0031523092184215784,
      "target_cp": -1000.0,
      "prediction_raw": 0.043826233595609665,
      "prediction_score": 0.043826233595609665,
      "prediction_cp": -535.5210700020782
    },
    {
      "source_row": 35258,
      "fen": "1r3rk1/p2q1pp1/8/8/P1R1p3/6Q1/6PP/2R3K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.30999380350112915,
      "target_cp": -139.0,
      "prediction_raw": 0.3135334849357605,
      "prediction_score": 0.3135334849357605,
      "prediction_cp": -136.1341712360971
    },
    {
      "source_row": 89665,
      "fen": "1r4k1/1B1Rr3/1p4pp/8/1P4p1/P7/7P/7K w - - 0 1",
      "phase": "endgame",
      "target_score": 0.9252264499664307,
      "target_cp": 437.0,
      "prediction_raw": 0.5064103603363037,
      "prediction_score": 0.5064103603363037,
      "prediction_cp": 4.454618674269832
    },
    {
      "source_row": 94915,
      "fen": "1r4k1/2R3p1/1p5p/3P4/8/6P1/5P1P/6K1 b - - 0 1",
      "phase": "endgame",
      "target_score": 0.501439094543457,
      "target_cp": 1.0,
      "prediction_raw": 0.670486330986023,
      "prediction_score": 0.670486330986023,
      "prediction_cp": 123.40659742553417
    }
  ]
};
