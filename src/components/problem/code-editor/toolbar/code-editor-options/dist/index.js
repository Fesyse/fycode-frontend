"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.CodeEditorOptions = void 0;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var useMediaQuery_1 = require("@/hooks/useMediaQuery");
var button_1 = require("@/components/shadcn/button");
var dialog_1 = require("@/components/shadcn/dialog");
var drawer_1 = require("@/components/shadcn/drawer");
var form_1 = require("@/components/shadcn/form");
var select_1 = require("@/components/shadcn/select");
var utils_1 = require("@/lib/utils");
var editor_options_store_1 = require("@/stores/problem/editor-options.store");
exports.CodeEditorOptions = function () {
    var _a = editor_options_store_1.useEditorOptionsStore(), editorOptions = _a.editorOptions, updateEditorOptions = _a.updateEditorOptions;
    var form = react_hook_form_1.useForm({
        defaultValues: editorOptions
    });
    var fontSizes = utils_1.range(21, 12); // [12, 13..32]
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var isMobile = useMediaQuery_1.useMediaQuery(useMediaQuery_1.mediaQueryOptions.small);
    var content = {
        button: (React.createElement(button_1.Button, { variant: "ghost", size: "smallIcon" },
            React.createElement(lucide_react_1.Settings, { size: 18 }))),
        header: {
            title: "Code editor options",
            description: "There you can specify your preferences for code editor."
        },
        ui: (React.createElement(form_1.Form, __assign({}, form),
            React.createElement("form", { onSubmit: form.handleSubmit(console.log) },
                React.createElement(form_1.FormField, { control: form.control, name: "fontSize", render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(form_1.FormItem, { className: "flex items-center gap-2 space-y-0" },
                            React.createElement(form_1.FormLabel, { className: "text-nowrap" }, "Font size"),
                            React.createElement(select_1.Select, { onValueChange: function (value) { return field.onChange(parseInt(value)); }, defaultValue: (_b = field.value) === null || _b === void 0 ? void 0 : _b.toString() },
                                React.createElement(select_1.SelectTrigger, { className: "w-24 h-8" },
                                    React.createElement(select_1.SelectValue, { className: "text-sm", placeholder: "Select" })),
                                React.createElement(select_1.SelectContent, null,
                                    React.createElement(select_1.SelectGroup, null, fontSizes.map(function (fontSize) { return (React.createElement(select_1.SelectItem, { key: fontSize, value: fontSize.toString() },
                                        fontSize,
                                        "px")); }))))));
                    } }))))
    };
    var props = { open: open, onOpenChange: setOpen };
    return isMobile ? (React.createElement(drawer_1.Drawer, __assign({}, props),
        React.createElement(drawer_1.DrawerTrigger, null, content.button),
        React.createElement(drawer_1.DrawerContent, null,
            React.createElement(drawer_1.DrawerHeader, null,
                React.createElement(drawer_1.DrawerTitle, null, content.header.title),
                React.createElement(drawer_1.DrawerDescription, null, content.header.description)),
            React.createElement("div", { className: "px-4 pb-6" }, content.ui)))) : (React.createElement(dialog_1.Dialog, __assign({}, props),
        React.createElement(dialog_1.DialogTrigger, null, content.button),
        React.createElement(dialog_1.DialogContent, null,
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, content.header.title),
                React.createElement(dialog_1.DialogDescription, null, content.header.description)),
            content.ui)));
};
