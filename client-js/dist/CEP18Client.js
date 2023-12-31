"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@ethersproject/bignumber");
var blake2b_1 = require("@noble/hashes/blake2b");
var casper_js_sdk_1 = require("casper-js-sdk");
var error_1 = require("./error");
var TypedContract_1 = __importDefault(require("./TypedContract"));
var types_1 = require("./types");
var CEP18Client = (function (_super) {
    __extends(CEP18Client, _super);
    function CEP18Client(nodeAddress, networkName) {
        var _this = _super.call(this, nodeAddress, networkName) || this;
        _this.nodeAddress = nodeAddress;
        _this.networkName = networkName;
        return _this;
    }
    CEP18Client.prototype.setContractHash = function (contractHash, contractPackageHash) {
        this.contractClient.setContractHash(contractHash, contractPackageHash);
    };
    Object.defineProperty(CEP18Client.prototype, "contractHash", {
        get: function () {
            return this.contractClient.contractHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CEP18Client.prototype, "contractPackageHash", {
        get: function () {
            return this.contractClient.contractPackageHash;
        },
        enumerable: false,
        configurable: true
    });
    CEP18Client.prototype.install = function (wasm, args, paymentAmount, sender, networkName, signingKeys) {
        var name = args.name, symbol = args.symbol, decimals = args.decimals, totalSupply = args.totalSupply, eventsMode = args.eventsMode;
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            name: casper_js_sdk_1.CLValueBuilder.string(name),
            symbol: casper_js_sdk_1.CLValueBuilder.string(symbol),
            decimals: casper_js_sdk_1.CLValueBuilder.u8(decimals),
            total_supply: casper_js_sdk_1.CLValueBuilder.u256(totalSupply)
        });
        if (eventsMode !== undefined) {
            runtimeArgs.insert('events_mode', casper_js_sdk_1.CLValueBuilder.u8(eventsMode));
        }
        return this.contractClient.install(wasm, runtimeArgs, bignumber_1.BigNumber.from(paymentAmount).toString(), sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, signingKeys);
    };
    CEP18Client.prototype.transfer = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            recipient: casper_js_sdk_1.CLValueBuilder.key(args.recipient),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('transfer', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.transferFrom = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            owner: casper_js_sdk_1.CLValueBuilder.key(args.owner),
            recipient: casper_js_sdk_1.CLValueBuilder.key(args.recipient),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('transfer_from', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.approve = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            spender: casper_js_sdk_1.CLValueBuilder.key(args.spender),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('approve', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.increaseAllowance = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            spender: casper_js_sdk_1.CLValueBuilder.key(args.spender),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('increase_allowance', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.decreaseAllowance = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            spender: casper_js_sdk_1.CLValueBuilder.key(args.spender),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('decrease_allowance', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.mint = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            owner: casper_js_sdk_1.CLValueBuilder.key(args.owner),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('mint', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.burn = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({
            owner: casper_js_sdk_1.CLValueBuilder.key(args.owner),
            amount: casper_js_sdk_1.CLValueBuilder.u256(args.amount)
        });
        return this.contractClient.callEntrypoint('burn', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.changeSecurity = function (args, paymentAmount, sender, networkName, signingKeys) {
        var runtimeArgs = casper_js_sdk_1.RuntimeArgs.fromMap({});
        if (args.adminList) {
            runtimeArgs.insert('admin_list', casper_js_sdk_1.CLValueBuilder.list(args.adminList.map(casper_js_sdk_1.CLValueBuilder.key)));
        }
        if (args.minterList) {
            runtimeArgs.insert('minter_list', casper_js_sdk_1.CLValueBuilder.list(args.minterList.map(casper_js_sdk_1.CLValueBuilder.key)));
        }
        if (args.burnerList) {
            runtimeArgs.insert('burner_list', casper_js_sdk_1.CLValueBuilder.list(args.burnerList.map(casper_js_sdk_1.CLValueBuilder.key)));
        }
        if (args.mintAndBurnList) {
            runtimeArgs.insert('mint_and_burn_list', casper_js_sdk_1.CLValueBuilder.list(args.mintAndBurnList.map(casper_js_sdk_1.CLValueBuilder.key)));
        }
        if (args.noneList) {
            runtimeArgs.insert('none_list', casper_js_sdk_1.CLValueBuilder.list(args.noneList.map(casper_js_sdk_1.CLValueBuilder.key)));
        }
        if (runtimeArgs.args.size === 0) {
            throw new Error('Should provide at least one arg');
        }
        return this.contractClient.callEntrypoint('change_security', runtimeArgs, sender, networkName !== null && networkName !== void 0 ? networkName : this.networkName, bignumber_1.BigNumber.from(paymentAmount).toString(), signingKeys);
    };
    CEP18Client.prototype.balanceOf = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var keyBytes, dictKey, balance, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyBytes = casper_js_sdk_1.CLValueParsers.toBytes(casper_js_sdk_1.CLValueBuilder.key(account)).unwrap();
                        dictKey = (0, casper_js_sdk_1.encodeBase64)(keyBytes);
                        balance = bignumber_1.BigNumber.from(0);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.contractClient.queryContractDictionary('balances', dictKey)];
                    case 2:
                        balance = (_a.sent()).value();
                        return [3, 4];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error &&
                            error_2.toString().startsWith('Error: state query failed: ValueNotFound')) {
                            console.warn("Not found balance for ".concat((0, casper_js_sdk_1.encodeBase16)(account.data)));
                        }
                        else
                            throw error_2;
                        return [3, 4];
                    case 4: return [2, balance];
                }
            });
        });
    };
    CEP18Client.prototype.allowances = function (owner, spender) {
        return __awaiter(this, void 0, void 0, function () {
            var keyOwner, keySpender, finalBytes, blaked, dictKey, allowances, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyOwner = casper_js_sdk_1.CLValueParsers.toBytes(casper_js_sdk_1.CLValueBuilder.key(owner)).unwrap();
                        keySpender = casper_js_sdk_1.CLValueParsers.toBytes(casper_js_sdk_1.CLValueBuilder.key(spender)).unwrap();
                        finalBytes = new Uint8Array(keyOwner.length + keySpender.length);
                        finalBytes.set(keyOwner);
                        finalBytes.set(keySpender, keyOwner.length);
                        blaked = (0, blake2b_1.blake2b)(finalBytes, {
                            dkLen: 32
                        });
                        dictKey = (0, casper_js_sdk_1.encodeBase16)(blaked);
                        allowances = bignumber_1.BigNumber.from(0);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.contractClient.queryContractDictionary('allowances', dictKey)];
                    case 2:
                        allowances = (_a.sent()).value();
                        return [3, 4];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3 instanceof Error &&
                            error_3.toString().startsWith('Error: state query failed: ValueNotFound')) {
                            console.warn("Not found allowances for ".concat((0, casper_js_sdk_1.encodeBase16)(owner.data)));
                        }
                        else
                            throw error_3;
                        return [3, 4];
                    case 4: return [2, allowances];
                }
            });
        });
    };
    CEP18Client.prototype.name = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.contractClient.queryContractData(['name'])];
            });
        });
    };
    CEP18Client.prototype.symbol = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.contractClient.queryContractData(['symbol'])];
            });
        });
    };
    CEP18Client.prototype.decimals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.contractClient.queryContractData([
                        'decimals'
                    ])];
            });
        });
    };
    CEP18Client.prototype.totalSupply = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.contractClient.queryContractData([
                        'total_supply'
                    ])];
            });
        });
    };
    CEP18Client.prototype.eventsMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var internalValue, u8res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.contractClient.queryContractData([
                            'events_mode'
                        ])];
                    case 1:
                        internalValue = (_a.sent());
                        u8res = internalValue.toNumber();
                        return [2, types_1.EVENTS_MODE[u8res]];
                }
            });
        });
    };
    CEP18Client.prototype.parseDeployResult = function (deployHash) {
        return __awaiter(this, void 0, void 0, function () {
            var casperClient, result, error_message, contractErrorMessagePrefix, errorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        casperClient = new casper_js_sdk_1.CasperServiceByJsonRPC(this.nodeAddress);
                        return [4, casperClient.getDeployInfo(deployHash)];
                    case 1:
                        result = _a.sent();
                        if (result.execution_results.length > 0 &&
                            result.execution_results[0].result.Failure) {
                            error_message = result.execution_results[0].result.Failure.error_message;
                            contractErrorMessagePrefix = 'User error: ';
                            if (error_message.startsWith(contractErrorMessagePrefix)) {
                                errorCode = parseInt(error_message.substring(contractErrorMessagePrefix.length, error_message.length), 10);
                                throw new error_1.ContractError(errorCode);
                            }
                            else
                                throw new Error(error_message);
                        }
                        return [2, result];
                }
            });
        });
    };
    return CEP18Client;
}(TypedContract_1.default));
exports.default = CEP18Client;
//# sourceMappingURL=CEP18Client.js.map